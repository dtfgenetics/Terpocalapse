"""Generate a stylized Terpocalypse Veg Lab enemy rig and animation in Blender.

Run headless:
  blender --background --python tools/blender/generate_veg_lab_enemy.py

Outputs (relative to repository root when run there):
  build/blender/veg-lab-mite.blend
  build/blender/veg-lab-mite.glb

The model is intentionally original and simple. It is a production-pipeline seed,
not final approved art. Replace/iterate the mesh while preserving object, bone,
and animation names so runtime integration stays stable.
"""
from pathlib import Path
import math
import bpy

ROOT = Path.cwd()
OUT_DIR = ROOT / "build" / "blender"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Clean scene
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)

# Materials

def material(name, base, roughness=0.55, metallic=0.0, emission=None):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*base, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1.0)
        bsdf.inputs["Emission Strength"].default_value = 2.0
    return mat

MAT_BODY = material("M_MiteBody", (0.09, 0.20, 0.08), 0.7)
MAT_SHELL = material("M_MiteShell", (0.31, 0.07, 0.03), 0.45)
MAT_EYE = material("M_MiteEye", (0.06, 0.8, 0.18), 0.3, emission=(0.06, 0.8, 0.18))

# Helpers

def add_uv(name, location, scale, mat):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=12, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    return obj

body = add_uv("Mite_Body", (0, 0, 0.85), (0.65, 0.82, 0.5), MAT_BODY)
shell = add_uv("Mite_Shell", (0, -0.05, 1.05), (0.48, 0.58, 0.28), MAT_SHELL)
head = add_uv("Mite_Head", (0, 0.58, 0.95), (0.42, 0.38, 0.34), MAT_SHELL)
for sx in (-1, 1):
    eye = add_uv(f"Mite_Eye_{'L' if sx < 0 else 'R'}", (0.15 * sx, 0.89, 1.04), (0.07, 0.05, 0.07), MAT_EYE)

# Legs are stable-named objects parented to the body. This keeps the first asset
# lightweight while still giving us animation-ready transforms.
legs = []
for side in (-1, 1):
    for idx, y in enumerate((0.42, 0.12, -0.20, -0.48)):
        bpy.ops.mesh.primitive_cylinder_add(vertices=10, radius=0.055, depth=0.72, location=(0.52 * side, y, 0.68))
        leg = bpy.context.object
        leg.name = f"Mite_Leg_{'L' if side < 0 else 'R'}_{idx+1:02d}"
        leg.data.materials.append(MAT_BODY)
        leg.rotation_euler = (0.0, math.radians(64), math.radians(12 * side))
        leg.parent = body
        legs.append((leg, side, idx))

# Empty root creates a clean gameplay pivot at ground center.
bpy.ops.object.empty_add(type="PLAIN_AXES", location=(0, 0, 0))
root = bpy.context.object
root.name = "ROOT_Mite"
for obj in [body, shell, head] + [o for o, _, _ in legs]:
    if obj.parent is None:
        obj.parent = root
for obj in [o for o in bpy.context.scene.objects if o.name.startswith("Mite_Eye_")]:
    obj.parent = root

# Animation contract: Idle, Scuttle, Hit, Death. Blender actions are exported as
# named clips in glTF when NLA tracks are present.
def animate_action(name, frame_start, frame_end, z_curve=(0.0, 0.06, 0.0), body_y=0.0):
    action = bpy.data.actions.new(name)
    root.animation_data_create()
    root.animation_data.action = action
    frames = [frame_start, (frame_start + frame_end)//2, frame_end]
    for frame, z in zip(frames, z_curve):
        root.location.z = z
        root.location.y = body_y * ((frame-frame_start)/max(1, frame_end-frame_start))
        root.keyframe_insert(data_path="location", frame=frame)
    # leg swing
    for leg, side, idx in legs:
        for frame, swing in [(frame_start, -10), ((frame_start+frame_end)//2, 10), (frame_end, -10)]:
            leg.rotation_euler.z = math.radians((12 * side) + swing * side * (1 if idx % 2 == 0 else -1))
            leg.keyframe_insert(data_path="rotation_euler", frame=frame)
    root.animation_data.action = None
    track = root.animation_data.nla_tracks.new()
    track.name = name
    strip = track.strips.new(name, frame_start, action)
    strip.action_frame_start = frame_start
    strip.action_frame_end = frame_end
    return action

animate_action("Idle", 1, 40, (0.0, 0.035, 0.0))
animate_action("Scuttle", 50, 80, (0.0, 0.025, 0.0), body_y=0.28)

# Hit reaction
hit = bpy.data.actions.new("Hit")
root.animation_data.action = hit
for frame, xrot in [(90, 0), (94, math.radians(-16)), (101, 0)]:
    root.rotation_euler.x = xrot
    root.keyframe_insert(data_path="rotation_euler", frame=frame)
root.animation_data.action = None
track = root.animation_data.nla_tracks.new(); track.name = "Hit"; track.strips.new("Hit", 90, hit)

# Death fall
death = bpy.data.actions.new("Death")
root.animation_data.action = death
for frame, z, xrot in [(110, 0, 0), (126, 0.04, math.radians(78)), (140, -0.08, math.radians(90))]:
    root.location.z = z
    root.rotation_euler.x = xrot
    root.keyframe_insert(data_path="location", frame=frame)
    root.keyframe_insert(data_path="rotation_euler", frame=frame)
root.animation_data.action = None
track = root.animation_data.nla_tracks.new(); track.name = "Death"; track.strips.new("Death", 110, death)

# Scene/export conventions
scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.unit_settings.system = "METRIC"
scene.unit_settings.scale_length = 1.0
scene.frame_start = 1
scene.frame_end = 140

blend_path = OUT_DIR / "veg-lab-mite.blend"
glb_path = OUT_DIR / "veg-lab-mite.glb"
bpy.ops.wm.save_as_mainfile(filepath=str(blend_path))

bpy.ops.object.select_all(action="DESELECT")
for obj in [root, body, shell, head] + [o for o, _, _ in legs] + [o for o in scene.objects if o.name.startswith("Mite_Eye_")]:
    obj.select_set(True)

bpy.ops.export_scene.gltf(
    filepath=str(glb_path),
    export_format="GLB",
    use_selection=True,
    export_yup=True,
    export_apply=False,
    export_animations=True,
    export_nla_strips=True,
    export_materials="EXPORT",
)
print(f"Wrote {blend_path}")
print(f"Wrote {glb_path}")
