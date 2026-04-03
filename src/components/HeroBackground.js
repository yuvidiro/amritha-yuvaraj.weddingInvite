import { useEffect, useRef } from "react";

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;

float spotlight(vec2 uv, vec2 origin, vec2 dir, float spread, float reach, float softness){
  vec2 toUV = uv - origin;
  float proj = dot(toUV, dir);
  if(proj < 0.0 || proj > reach) return 0.0;
  float perp = abs(dot(toUV, vec2(-dir.y, dir.x)));
  float halfW = spread * (proj / reach);
  float edge = smoothstep(halfW, halfW - softness, perp);
  float falloff = 1.0 - smoothstep(0.0, reach, proj);
  return edge * falloff * falloff;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;

  // beam 1 — warm gold
  float a1 = -0.35 + sin(u_time * 0.4) * 0.55;
  float b1 = spotlight(uv, vec2(0.1, 0.0), normalize(vec2(cos(a1), sin(a1))), 0.28, 1.6, 0.04);
  vec3 c1 = vec3(1.0, 0.93, 0.78) * b1 * 1.1;

  // beam 2 — lavender
  float a2 = 3.14 + 0.35 + sin(u_time * 0.4 + 2.1) * 0.5;
  float b2 = spotlight(uv, vec2(0.9, 0.0), normalize(vec2(cos(a2), sin(a2))), 0.22, 1.6, 0.035);
  vec3 c2 = vec3(0.78, 0.72, 1.0) * b2 * 0.85;

  // beam 3 — center shaft
  float a3 = 1.57 + sin(u_time * 0.25 + 1.0) * 0.12;
  vec2 o3 = vec2(0.5 + sin(u_time * 0.3) * 0.3, 0.0);
  float b3 = spotlight(uv, o3, normalize(vec2(cos(a3), sin(a3))), 0.06, 1.4, 0.015);
  vec3 c3 = vec3(1.0, 0.88, 0.65) * b3 * 0.7;

  // subtle floor glow
  float dFloor = length(uv - vec2(0.5 + sin(u_time*0.3)*0.15, 1.05));
  vec3 floor_ = vec3(0.9, 0.7, 0.4) * exp(-dFloor*dFloor*6.0) * 0.18;

  float vig = smoothstep(0.9, 0.35, length(uv - vec2(0.5, 0.48)));

  // soft centralized text glow behind hero names
  float dCenter = length(uv - vec2(0.5, 0.43));
  vec3 centerGlow = vec3(1.0, 0.91, 0.75) * exp(-dCenter * dCenter * 75.0) * (0.6 + 0.4 * sin(u_time * 1.8));

  vec3 col = (c1 + c2 + c3 + floor_ + centerGlow) * (vig * 0.85 + 0.15);
  col = pow(col, vec3(0.9));

  float alpha = clamp(length(col) * 1.2, 0.0, 1.0);

  gl_FragColor = vec4(col, alpha);
}
`;

const VERT = `
precision mediump float;
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

export default function HeroBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;

    const gl = canvas.getContext("webgl", { alpha: true });
    if (!gl) return;

    // Enable additive blending (light effect)
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const resize = () => {
      canvas.width  = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(s));
      }
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(prog));
    }

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pLoc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(pLoc);
    gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const start = performance.now();
    let rafId;

    const frame = () => {
      const t = (performance.now() - start) / 1000;

      gl.clearColor(0, 0, 0, 0); // transparent clear
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      rafId = requestAnimationFrame(frame);
    };

    frame();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -2,
        pointerEvents: "none",
      }}
    />
  );
}