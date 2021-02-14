#version 300 es
precision mediump float;

in vec2 v_uv;

uniform sampler2D atlas;

out vec4 out_finalColor;

void main() {
    vec4 color = texture(atlas, v_uv);
    out_finalColor = vec4(color.rgb, 1.0);
}
