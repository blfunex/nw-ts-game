#version 300 es

layout(location = 0) in vec3 position;
layout(location = 1) in vec2 uv;
layout(location = 2) in vec3 normal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

out vec2 v_uv;

void main() {
    v_uv = uv;
    gl_PointSize = 10.0;
    gl_Position = projection * view * model * vec4(position, 1.0);
}
