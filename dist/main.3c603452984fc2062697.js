(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"+qSP":function(e,t,n){"use strict";var i=n("JPst"),r=n.n(i)()((function(e){return e[1]}));r.push([e.i,"body {\n  margin: 0;\n}\n\n#input-container {\n  display: flex;\n  flex-direction: column;\n  max-width: 400px;\n}\n\n#canvas-container {\n  height: 100vh;\n  overflow: hidden;\n}\ncanvas {\n  width: 100%;\n  height: 100%;\n}\n",""]),t.a=r},"/7QA":function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),n("p2bk");(new(i(n("0Amw")).default)).initApplication()},"0Amw":function(e,t,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return r(t,e),t},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(n("Womt")),u=a(n("Eulv")),c=a(n("1gap")),f=a(n("jyI1")),l=a(n("Vm85")),d=a(n("i5k1"));function h(e,t,n=.1,i=.001){let r=(t-e)*n;return Math.abs(r)<i&&(r=t-e),r}t.default=class{constructor(){if(this.fovTarget=90,this.speedUpTarget=0,this.speedUp=0,this.timeOffset=0,this.onMouseDown=this.onMouseDown.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.clock=new s.Clock,this.canvasContainer=document.createElement("div"),this.canvasContainer.id="canvas-container",this.rootContainer=document.getElementById("root"),!this.rootContainer)throw new Error("No root container!");this.rootContainer.appendChild(this.canvasContainer),this.rootContainer.addEventListener("mousedown",this.onMouseDown),this.rootContainer.addEventListener("mouseup",this.onMouseUp),this.rootContainer.addEventListener("mouseout",this.onMouseUp);const{camera:e,renderer:t,scene:n}=u.default();this.camera=e,this.renderer=t,this.scene=n,this.light=new c.default,this.road=new f.default,this.leftLights=new l.default("#fafafa",-60),this.rightLights=new l.default("#ff102a",60),n.add(this.light.object),n.add(this.road.object),n.add(this.leftLights.object),n.add(this.rightLights.object),this.tick=this.tick.bind(this),this.initApplication=this.initApplication.bind(this)}initApplication(){this.leftLights.object.position.setX(-d.default.roadWidth/2-d.default.islandWidth/2),this.rightLights.object.position.setX(d.default.roadWidth/2+d.default.islandWidth/2),this.canvasContainer.append(this.renderer.domElement),this.tick()}render(e){this.renderer.render(this.scene,this.camera)}onMouseDown(){this.speedUpTarget=.1,this.fovTarget=140}onMouseUp(){this.speedUpTarget=0,this.fovTarget=90}tick(){if(!this)return;const e=this.renderer.domElement;this.camera.aspect=e.clientWidth/e.clientHeight,this.camera.updateProjectionMatrix();const t=this.clock.getDelta();this.render(t),this.update(t),requestAnimationFrame(this.tick)}update(e){let t=-60*Math.log2(.9),n=Math.exp(-t*e);this.speedUp+=h(this.speedUp,this.speedUpTarget,n,1e-5),this.timeOffset+=this.speedUp*e;let i=this.clock.elapsedTime+this.timeOffset;this.leftLights.update(i),this.rightLights.update(i);let r=h(this.camera.fov,this.fovTarget,n);0!==r&&(this.camera.fov+=r*e*6,this.camera.updateProjectionMatrix())}}},"1gap":function(e,t,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const a=o(n("Womt"));t.default=class{constructor(){const e=this.creratObject();this.object=e}creratObject(){const e=new a.DirectionalLight(16777215,1);return e.position.set(-1,2,4),e}}},Eulv:function(e,t,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return r(t,e),t},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(n("Womt")),u=a(n("i5k1"));t.default=()=>{const e=new s.Clock,t=new s.Scene,n=new s.PerspectiveCamera(u.default.fov,u.default.aspect,u.default.near,u.default.far);n.position.set(u.default.initialX,u.default.initialY,u.default.initialZ);const i=new s.WebGLRenderer({antialias:!0}),r=document.getElementById("canvas-container");if(!r)throw new Error("No canvas container!");return i.setSize(r.offsetWidth,r.offsetHeight),i.setPixelRatio(Math.min(2,window.devicePixelRatio)),{camera:n,clock:e,renderer:i,scene:t}}},Vm85:function(e,t,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return r(t,e),t},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(n("Womt")),u=a(n("i5k1"));t.default=class{constructor(e,t){this.fragmentShader="\n    uniform vec3 uColor;\n      void main() {\n          vec3 color = vec3(uColor);\n          gl_FragColor = vec4(color,1.);\n      }\n    ",this.vertexShader="\n    attribute vec3 aOffset;\n    attribute vec2 aMetrics;\n    uniform float uTime;\n    uniform float uSpeed;\n    uniform float uTravelLength;\n    #include <getDistortion_vertex>\n      void main() {\n        vec3 transformed = position.xyz;\n        \n        float radius = aMetrics.r;\n        float len = aMetrics.g;\n        transformed.xy *= radius; \n        transformed.z *= len;\n    \n        float zOffset = uTime * uSpeed + aOffset.z;\n        zOffset = len - mod(zOffset, uTravelLength);\n    \n        // transformed.z +=uTime * uSpeed;\n    \n    \n        // Keep them separated to make the next step easier!\n         transformed.z = transformed.z +zOffset ;\n            transformed.xy += aOffset.xy;\n    \n            \n        float progress = abs(transformed.z / uTravelLength);\n        transformed.xyz += getDistortion(progress);\n    \n      \n            vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);\n            gl_Position = projectionMatrix * mvPosition;\n      }\n    ",this.createObject(e,t)}createObject(e,t){const n=new s.LineCurve3(new s.Vector3(0,0,0),new s.Vector3(0,0,-1)),i=new s.TubeBufferGeometry(n,25,1,8,!1),r=(new s.InstancedBufferGeometry).copy(i);r.instanceCount=2*u.default.nPairs;const o=[],a=u.default.roadWidth/u.default.roadSections;for(let e=0;e<u.default.nPairs;e++){const t=1,n=e%3*a-u.default.roadWidth/2+a/2,i=.5*a,r=.5*Math.random(),s=1.3*t,c=Math.random()*u.default.length;o.push(n-i/2+r),o.push(s),o.push(-c),o.push(n+i/2+r),o.push(s),o.push(-c)}r.setAttribute("aOffset",new s.InstancedBufferAttribute(new Float32Array(o),3,!1));const c=[];for(let e=0;e<u.default.nPairs;e++){const e=.1*Math.random()+.1,t=Math.random()*u.default.length*.08+.02*u.default.length;c.push(e),c.push(t),c.push(e),c.push(t)}r.setAttribute("aMetrics",new s.InstancedBufferAttribute(new Float32Array(c),2,!1));const f=new s.ShaderMaterial({fragmentShader:this.fragmentShader,vertexShader:this.vertexShader,uniforms:{uColor:new s.Uniform(new s.Color(e)),uTime:new s.Uniform(0),uTravelLength:new s.Uniform(u.default.length),uSpeed:new s.Uniform(t),uDistortionX:new s.Uniform(new s.Vector2(80,3)),uDistortionY:new s.Uniform(new s.Vector2(-40,2.5))}});f.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <getDistortion_vertex>","\n      #define PI 3.14159265358979\n        uniform vec2 uDistortionX;\n        uniform vec2 uDistortionY;\n      \n          float nsin(float val){\n          return sin(val) * 0.5+0.5;\n          }\n        vec3 getDistortion(float progress){\n              progress = clamp(progress, 0.,1.);\n              float xAmp = uDistortionX.r;\n              float xFreq = uDistortionX.g;\n              float yAmp = uDistortionY.r;\n              float yFreq = uDistortionY.g;\n              return vec3( \n                  xAmp * nsin(progress* PI * xFreq   - PI / 2. ) ,\n                  yAmp * nsin(progress * PI *yFreq - PI / 2.  ) ,\n                  0.\n              );\n          }\n      ")};const l=new s.Mesh(r,f);l.frustumCulled=!1,this.object=l}update(e){this.object.material.uniforms.uTime.value=e}}},i5k1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i={aspect:window.innerWidth/window.innerHeight,far:1e4,fov:45,initialX:0,initialY:7,initialZ:-5,islandWidth:2,length:400,nPairs:50,near:.1,roadSections:3,roadWidth:9,width:20};t.default=i},jyI1:function(e,t,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return r(t,e),t},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(n("Womt")),u=a(n("i5k1"));t.default=class{constructor(){const e=this.createObject();this.object=e}createObject(){const e=new s.PlaneBufferGeometry(u.default.width,u.default.length,20,200),t=new s.ShaderMaterial({fragmentShader:"\n    uniform vec3 uColor;\n\tvoid main(){\n        gl_FragColor = vec4(uColor,1.);\n    }\n",vertexShader:"\n    uniform float uTravelLength;\n    #include <getDistortion_vertex>\n      void main(){\n            vec3 transformed = position.xyz;\n            \n        float progress = (transformed.y + uTravelLength / 2.) / uTravelLength;\n        vec3 distortion  = getDistortion(progress);\n        transformed.x += distortion.x;\n        transformed.z += distortion.y;\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed.xyz, 1.);\n      }\n    ",uniforms:{uColor:new s.Uniform(new s.Color("#101012")),uTime:new s.Uniform(0),uTravelLength:new s.Uniform(u.default.length),uDistortionX:new s.Uniform(new s.Vector2(80,3)),uDistortionY:new s.Uniform(new s.Vector2(-40,2.5))}});t.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <getDistortion_vertex>","\n      #define PI 3.14159265358979\n        uniform vec2 uDistortionX;\n        uniform vec2 uDistortionY;\n      \n          float nsin(float val){\n          return sin(val) * 0.5+0.5;\n          }\n        vec3 getDistortion(float progress){\n              progress = clamp(progress, 0.,1.);\n              float xAmp = uDistortionX.r;\n              float xFreq = uDistortionX.g;\n              float yAmp = uDistortionY.r;\n              float yFreq = uDistortionY.g;\n              return vec3( \n                  xAmp * nsin(progress* PI * xFreq   - PI / 2. ) ,\n                  yAmp * nsin(progress * PI *yFreq - PI / 2.  ) ,\n                  0.\n              );\n          }\n      ")};const n=new s.Mesh(e,t);return n.rotation.x=-Math.PI/2,n.position.z=-u.default.length/2,n}}},p2bk:function(e,t,n){"use strict";n.r(t);var i=n("LboF"),r=n.n(i),o=n("+qSP"),a={insert:"head",singleton:!1};r()(o.a,a);t.default=o.a.locals||{}}},[["/7QA",1,2]]]);