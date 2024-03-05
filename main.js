import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh } from './addMeshes'
import { addLight } from './addLights'
import { background, magicCircle, cover, button, girlcover,coverdrop,coverdrop1 } from './addMeshes'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Model from './Model'
import gsap from 'gsap'

import { DragControls } from 'three/addons/controls/DragControls.js';


const renderer = new THREE.WebGLRenderer({ antialias: true })
// const camera = new THREE.PerspectiveCamera(
// 	75,
// 	window.innerWidth / window.innerHeight,
// 	0.1,
// 	100
// )

var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 8; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);




const scene = new THREE.Scene()
const meshes = {}
const lights = {}
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
//pointer.x or pointer.y
const mixers = []
const dragObjects = [
	meshes.mybow
 
]

// const controls = new OrbitControls(camera, renderer.domElement)

// controls.enableDamping = true
// controls.dampingFactor = 0.08
// controls.enablePan = false
// controls.enableZoom = false
const clock = new THREE.Clock()





const interactable = []
const modelCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
modelCamera.position.z = 5;





init()
function init() {
	//set up our renderer default settings, add scene/canvas to webpage
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	meshes.default = addBoilerPlateMeshes()
	meshes.standard = addStandardMesh()

	meshes.background = background()
	meshes.magicCircle = magicCircle()
	meshes.cover = cover()
	meshes.button = button()
	meshes.girlcover = girlcover()
	meshes.coverdrop = coverdrop()
	meshes.coverdrop1 = coverdrop1()

	lights.default = addLight()

	scene.add(lights.default)
	// scene.add(meshes.standard)
	// scene.add(meshes.default)

	scene.add(meshes.background)
	scene.add(meshes.magicCircle)


	// scene.add(meshes.cover)
	// scene.add(meshes.button)
	// scene.add(meshes.girlcover)
	// scene.add(meshes.coverdrop)
	// scene.add(meshes.coverdrop1)


	camera.position.set(0, 0, 200); //设置相机位置
	camera.lookAt(scene.position);
	//learnGSAP()
	raycast()
	instances()
	resize()
	animate()

}



function instances() {


	const girl = new Model({
		url: '/grace22.glb',
		scene: scene,
		meshes: meshes,
		name: 'mygirl',
		position: new THREE.Vector3(0, -10.5, 2.5),
		scale: new THREE.Vector3(0,0,0),
		mixers: mixers,
		//replace: true,
		animationState: true,
		container: interactable,


	})
	girl.init()




	const bear = new Model({
		url: '/teddybears.glb',
		scene: scene,
		meshes: meshes,
		name: 'mybear',
		position: new THREE.Vector3(-16, 10, 2),
		scale: new THREE.Vector3(0.7, 0.75, 0.7),
		mixers: mixers,
		replace: true,
		animationState: true,
		container: interactable,

	})
	bear.init()

	const heart = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/heart.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		replace: true,
		name: 'myheart',
		position: new THREE.Vector3(-9, -5, 1),
		scale: new THREE.Vector3(2, 2, 2),
		container: interactable,
	})
	heart.init()


	const bow = new Model({
		url: '/gift_bow.glb',
		scene: scene,
		meshes: meshes,
		name: 'mybow',
		position: new THREE.Vector3(9.5, 1, 1),
		scale: new THREE.Vector3(5.5, 5.5, 5.5),
		mixers: mixers,
		replace: true,
		animationState: true,
		container: interactable,
		class: 'bow',

	})
	bow.init()


	const heart1 = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/heart.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		replace: true,
		name: 'heart1',
		position: new THREE.Vector3(0, -5, 1),
		scale: new THREE.Vector3(0,0,0),
		container: interactable,
	})
	heart1.init()



	const wingL = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/wingsL.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		//replace: true,
		name: 'mywingL',
		position: new THREE.Vector3(2, -1, 0),
		scale: new THREE.Vector3(0,0,0),
		container: interactable,
		visible:false,

	})
	wingL.init()



	const wingR = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/wingsR.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		//replace: true,
		name: 'mywingR',
		position: new THREE.Vector3(-2, -1, 0),
		scale: new THREE.Vector3(0,0,0),
		container: interactable,
	})
	wingR.init()


	const bottle = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/bottle.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		replace: true,
		name: 'mybottle',
		position: new THREE.Vector3(8, -4, 5),
		scale: new THREE.Vector3(13,14,13),
		container: interactable,
	})
	bottle.init()

	const door = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/door.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		replace: true,
		name: 'mydoor',
		position: new THREE.Vector3(0, -7, 6),
		scale: new THREE.Vector3(6,6,6),
		container: interactable,
	})
	door.init()
}






function raycast() {
	window.addEventListener('click', (event) => {
		pointer.x = (event.clientX / window.innerWidth) * 2 - 1
		pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
		raycaster.setFromCamera(pointer, camera)
		const intersects = raycaster.intersectObjects(scene.children)
		for (let i = 0; i < intersects.length; i++) {
			const clickedObject = intersects[i].object.name;
			console.log('Clicked object:', intersects[i].object.name);
			if (clickedObject == 'button') {
				meshes.cover.visible = false;
				meshes.button.visible = false
				meshes.girlcover.visible = false;
				scene.remove(meshes.cover)
				scene.remove(meshes.button)
				scene.remove(meshes.girlcover)
				const audio = document.querySelector('.introAudio')
				audio.play()
				controls.enabled = true
			}

			if (clickedObject == 'Door_1') {
				scene.remove(meshes.mydoor)
				gsap.to(meshes.mygirl.scale, {
					duration: 0.5,
					x: 15,
					y: 15,
					z: 15,
				});
				gsap.to(meshes.heart1.scale, {
					duration: 0.5,
					x: 1,
					y: 1,
					z: 1,
					ease: 'power3.inOut',
				});

				gsap.to(meshes.heart1.scale, {
					duration: 0.5,
					x: 1,
					y: 1,
					z: 1
				});
				gsap.to(meshes.heart1.scale, {
					duration: 0.5,
					x: 1,
					y: 1,
					z: 1
				});
				gsap.to(meshes.heart1.scale, {
					duration: 0.5,
					x: 1,
					y: 1,
					z: 1
				});
			}




			if (clickedObject == 'Bow__0') {
				gsap.to(meshes.mybear.scale, {
					duration: 0.5,
					x: 1.2,
					y: 1.2,
					z: 1.2
				});
			}
			if (clickedObject == 'Crystal_Heart_Crystal_Heart_Mat_0') {
				gsap.to(meshes.mybow.scale, {
					duration: 0.5,
					x: 22,
					y: 22,
					z: 22
				});
			}

			if (clickedObject == 'Object_26'|| clickedObject === 'Object_7') {
				gsap.to(meshes.myheart.scale, {
					duration: 0.5,
					x: 5,
					y: 5,
					z: 5,
				});
			}

			if (clickedObject == '円柱007_1') {
				// meshes.mywingL.visible = false;
				// meshes.mywingR.visible = false
				gsap.to(meshes.mywingL.scale, {
					duration: 0.5,
					x: 10,
					y: 10,
					z: 5,
				});
				gsap.to(meshes.mywingR.scale, {
					duration: 0.5,
					x: 10,
					y: 10,
					z: 5,
				});
				
			}

			// else if (clickedObject === cube2) {
			// 	gsap.to(target2.scale, { duration: 0.5, x: 2, y: 2, z: 2 });
			// }
		}



	})
}

function learnGSAP() {
	const button = document.querySelector('.tempButton')
	button.addEventListener('click', (event) => {
		gsap.to(meshes.default.scale, {
			x: 5,
			y: 5,
			z: 5,
			duration: 3.5,
			ease: 'power3.inOut',
		})
		gsap.to(meshes.standard.scale, {
			x: .5,
			y: .5,
			z: .5,
			duration: 3.5,
			ease: 'power3.inOut',
		})
	})

}


// function resize() {
// 	window.addEventListener('resize', () => {
// 		renderer.setSize(window.innerWidth, window.innerHeight)
// 		camera.aspect = window.innerWidth / window.innerHeight
// 		camera.updateProjectionMatrix()
// 	})
// }

function resize() {
	window.addEventListener('resize', () => {
		// 更新窗口宽度和高度
		var width = window.innerWidth;
		var height = window.innerHeight;
		var k = width / height; // 更新窗口宽高比
		renderer.setSize(width, height); // 更新渲染器大小
		camera.left = -s * k; // 更新相机左侧参数
		camera.right = s * k; // 更新相机右侧参数
		camera.top = s; // 更新相机顶部参数
		camera.bottom = -s; // 更新相机底部参数
		camera.aspect = k; // 更新相机宽高比
		camera.updateProjectionMatrix(); // 更新相机投影矩阵
	});
}


function animate() {
	requestAnimationFrame(animate)
	const delta = clock.getDelta()

	for (const mixer of mixers) {
		mixer.update(delta)
	}

	const tick = clock.getElapsedTime()

	// controls.update()


	meshes.magicCircle.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), 0.002);
	meshes.coverdrop1.scale.y +=0.01;

	if (meshes.mybow) {
		meshes.mybow.position.y = Math.sin(tick * 3) * 0.2 + 4;
	}

	if (meshes.mybottle) {
		meshes.mybottle.position.y = Math.sin(tick * 3.5) * 0.2 - 4;
	}
	if (meshes.mybear) {
		meshes.mybear.position.y = Math.sin(tick * 3) * 0.2 + 3;
	}



	if (meshes.mygirl) {
		//meshes.girl.rotation.set(0, Math.PI, 0);
		meshes.mygirl.position.y = Math.sin(tick * 3) * 0.1 - 18.5;

	}

	if (meshes.heart1) {
		meshes.heart1.position.x = Math.sin(tick * 3) * 3
		meshes.heart1.position.z = Math.cos(tick * 3) * 3 + 3.5

	}

	if (meshes.button) {
		//meshes.button.rotation.y -= 0.01;
		meshes.button.position.y = Math.sin(tick * 3) * 0.2 - 0.1;
	}

	if (meshes.girlcover) {
		//meshes.button.rotation.y -= 0.01;
		meshes.girlcover.position.y = Math.sin(tick) * 0.2;
	}

	if (meshes.mywingR) {
		//meshes.button.rotation.y -= 0.01;
		meshes.mywingR.position.y = Math.sin(tick) * 0.2;
	}
	if (meshes.mywingL) {
		//meshes.button.rotation.y -= 0.01;
		meshes.mywingL.position.y = Math.sin(tick) * 0.2;
	}




	meshes.default.rotation.x += 0.01
	meshes.default.rotation.y -= 0.01
	meshes.standard.rotation.x -= 0.01
	meshes.standard.rotation.z -= 0.01

	renderer.render(scene, camera)
}

function loader() {
	const enter = document.querySelector('.enterButton')
	const loader = document.querySelector('.loader')
	enter.addEventListener('click', () => {
		gsap.to(loader, {
			autoAlpha: 0,
			duration: 5,
			onComplete: () => {
				loader.style.display = 'none'
			},
		})
		// controls.enabled = true
	})
	gsap.to(enter, {
		opacity: 1,
		duration: 4,
		delay: 2.0,
	})
}