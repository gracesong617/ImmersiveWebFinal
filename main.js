import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh } from './addMeshes'
import { addLight } from './addLights'
import { background, magicCircle, cover, button, girlcover, coverdrop, coverdrop1 } from './addMeshes'
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

const controls = new OrbitControls(camera, renderer.domElement)

controls.enableDamping = true
controls.dampingFactor = 0.08
controls.enablePan = false
controls.enableZoom = true
controls.maxZoom = 2;
controls.minZoom = 1;
controls.minAzimuthAngle = -10 * Math.PI / 180; // 设置最小水平旋转角度为 -30 度
controls.maxAzimuthAngle = 10 * Math.PI / 180;
controls.minPolarAngle = 80 * Math.PI / 180; // 设置最小垂直选择角度
controls.maxPolarAngle = 90 * Math.PI / 180;
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


	scene.add(meshes.cover)
	scene.add(meshes.button)
	scene.add(meshes.girlcover)
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
		url: '/can.glb',
		scene: scene,
		meshes: meshes,
		name: 'mybear',
		position: new THREE.Vector3(-10, -10,1),
		scale: new THREE.Vector3(0,0,0),
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
		position: new THREE.Vector3(-10, -6, 1),
		scale: new THREE.Vector3(0,0,0),
		container: interactable,
	})
	heart.init()


	const bow = new Model({
		url: '/gift_bow.glb',
		scene: scene,
		meshes: meshes,
		name: 'mybow',
		position: new THREE.Vector3(9.5, 1, 1),
		scale: new THREE.Vector3(0,0,0),
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
		scale: new THREE.Vector3(0, 0, 0),
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
		scale: new THREE.Vector3(0, 0, 0),
		container: interactable,
		visible: false,

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
		scale: new THREE.Vector3(0, 0, 0),
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
		scale: new THREE.Vector3(0,0,0),
		container: interactable,
	})
	bottle.init()

	const cake = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/cake.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		replace: true,
		name: 'mycake',
		position: new THREE.Vector3(12, -2, 5),
		scale: new THREE.Vector3(0,0,0),
		container: interactable,
	})
	cake.init()

	const door = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/door.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		replace: true,
		name: 'mydoor',
		position: new THREE.Vector3(-7, -7, 6),
		scale: new THREE.Vector3(6,6,6),
		container: interactable,
	})
	door.init()

	const angelR = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/AngelR.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		//replace: true,
		name: 'myangelR',
		position: new THREE.Vector3(1, 0, 0),
		scale: new THREE.Vector3(0, 0, 0),
		container: interactable,
	})
	angelR.init()


	const angelL = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/AngelL.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		//replace: true,
		name: 'myangelL',
		position: new THREE.Vector3(-1, 0, 0),
		scale: new THREE.Vector3(0, 0, 0),
		container: interactable,
	})
	angelL.init()

	const angelH = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/Angelhead.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		//replace: true,
		name: 'myangelH',
		position: new THREE.Vector3(0, 6, 2),
		scale: new THREE.Vector3(0, 0, 0),
		container: interactable,
	})
	angelH.init()

	const angelbow = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/angelbow.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		//replace: true,
		name: 'myangelbow',
		position: new THREE.Vector3(-4, -6, 10),
		scale: new THREE.Vector3(0, 0, 0),
		container: interactable,
	})
	angelbow.init()

	const book = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/sbook.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		replace: true,
		name: 'mybook',
		position: new THREE.Vector3(-12, 0, 0),
		scale: new THREE.Vector3(0.01,0.01,0.01),
		container: interactable,
	})
	book.init()

	const hat = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/sisterhat.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		//replace: true,
		name: 'myhat',
		position: new THREE.Vector3(0, 40, 4),
		scale: new THREE.Vector3(0,0,0),
		container: interactable,
	})
	hat.init()


	const rainbow = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/rainbow.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		//replace: true,
		name: 'myrainbow',
		position: new THREE.Vector3(0,-7.6,-5),
		scale: new THREE.Vector3(0,0,0),
		container: interactable,
	})
	rainbow.init()

	const bg = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/bg.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		//replace: true,
		name: 'mybg',
		position: new THREE.Vector3(0,-7.6,3),
		scale: new THREE.Vector3(0,0,0),
		container: interactable,
	})
	bg.init()

	// const map = new Model({
	// 	//4 mandatories
	// 	mixers: mixers,
	// 	url: '/red.glb',
	// 	animationState: true,
	// 	scene: scene,
	// 	meshes: meshes,
	// 	//replace: true,
	// 	name: 'mymap',
	// 	position: new THREE.Vector3(0,-7.6,-15),
	// 	scale: new THREE.Vector3(2,1.7,1.7),
	// 	container: interactable,
	// })
	// map.init()

	const star = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/star.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		replace: true,
		name: 'mystar',
		position: new THREE.Vector3(-2,3.2,-20),
		scale: new THREE.Vector3(0,0,0),
		container: interactable,
	})
	star.init()

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

				gsap.to(meshes.myheart.scale, {
					duration: 0.5,
					x: 2,
					y: 2,
					z: 2
				});
				gsap.to(meshes.mybear.scale, {
					duration: 0.5,
					x: 20,
					y: 20,
					z: 20
				});
				gsap.to(meshes.mybottle.scale, {
					duration: 0.5,
					x: 13,
					y: 14,
					z: 13
				});
				gsap.to(meshes.mycake.scale, {
					duration: 0.5,
					x: 1,
					y: 1,
					z: 1
				});
				gsap.to(meshes.mybook.scale, {
					duration: 0.5,
					x: 8,
					y: 8,
					z: 8
				});
				gsap.to(meshes.mybow.scale, {
					duration: 0.5,
					x: 5.5,
					y: 5.5,
					z: 5.5
				});
			}




			if (clickedObject == 'Bow__0') {
				gsap.to(meshes.mybg.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myrainbow.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.mystar.scale, {
					duration: 0.5,
					x: 4,
					y: 4,
					z: 4
				});
			}
			if (clickedObject == 'Crystal_Heart_Crystal_Heart_Mat_0') {
				gsap.to(meshes.mystar.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0
				});
				gsap.to(meshes.mybg.scale, {
					duration: 0.5,
					x: 2.4,
					y: 2.5,
					z: 1.1,
				});
				gsap.to(meshes.myrainbow.scale, {
					duration: 0.5,
					x: 2.4,
					y: 2.5,
					z: 1.1,
				});
			}

			if (clickedObject == 'can_low') {

				gsap.to(meshes.mystar.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0
				});
				gsap.to(meshes.mybg.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myrainbow.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});

				gsap.to(meshes.myhat.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myhat.position, {
					duration: 0.5,
					x: 0,
					y: 40,
					z: 0,
				});
				gsap.to(meshes.myangelR.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myangelL.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myangelH.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.mywingL.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.mywingR.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myangelbow.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				
		
			}

			if (clickedObject == '円柱007_1') {
				gsap.to(meshes.myhat.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myhat.position, {
					duration: 0.5,
					x: 0,
					y: 40,
					z: 4,
				});
				gsap.to(meshes.myangelR.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myangelL.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myangelH.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
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
				gsap.to(meshes.myangelbow.scale, {
					duration: 0.5,
					x: 10,
					y: 10,
					z: 10,
				});
			}

			if (clickedObject == 'TorusKnot004_4') {
				gsap.to(meshes.myhat.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myhat.position, {
					duration: 0.5,
					x: 0,
					y: 40,
					z: 4,
				});
				gsap.to(meshes.myangelbow.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.mywingL.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.mywingR.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myangelR.scale, {
					duration: 0.5,
					x: 14,
					y: 14,
					z: 10,
				});
				gsap.to(meshes.myangelL.scale, {
					duration: 0.5,
					x: 14,
					y: 14,
					z: 10,
				});
				gsap.to(meshes.myangelH.scale, {
					duration: 0.5,
					x: 20,
					y: 20,
					z: 10,
				});

				
			}

			if (clickedObject == 'kami') {
				gsap.to(meshes.myangelR.scale, {
					duration: 0,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myangelL.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myangelH.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.mywingL.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.mywingR.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myangelbow.scale, {
					duration: 0.5,
					x: 0,
					y: 0,
					z: 0,
				});
				gsap.to(meshes.myhat.scale, {
					duration: 0.5,
					x: 24,
					y: 20,
					z: 20,
				});
				gsap.to(meshes.myhat.position, {
					duration: 0.5,
					x: 0,
					y: 2.5,
					z: 2,
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

	controls.update()


	meshes.magicCircle.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), 0.002);
	meshes.coverdrop1.scale.y += 0.01;

	if (meshes.mybow) {
		meshes.mybow.position.y = Math.sin(tick * 3) * 0.2 + 4;
	}

	if (meshes.mybottle) {
		meshes.mybottle.position.y = Math.sin(tick * 3.5) * 0.2 - 4;
	}
	if (meshes.mybear) {
		meshes.mybear.position.y = Math.sin(tick * 3) * 0.2 + 5;
		meshes.mybear.rotation.set( 15* Math.PI / 180,0,0)

	}



	if (meshes.mygirl) {
		//meshes.girl.rotation.set(0, Math.PI, 0);
		meshes.mygirl.position.y = Math.sin(tick * 3) * 0.1 - 18.5;

	}

	if (meshes.heart1) {
		meshes.heart1.position.x = Math.sin(tick * 3) * 3
		meshes.heart1.position.z = Math.cos(tick * 3) * 3 + 3.8

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
		meshes.mywingR.position.y = Math.sin(tick) * 0.2;
	}
	if (meshes.mywingL) {
		meshes.mywingL.position.y = Math.sin(tick) * 0.2;
	}

	if (meshes.myangelR) {
		meshes.myangelR.position.y = Math.sin(tick) * 0.3;
	}
	if (meshes.myangelL) {
		meshes.myangelL.position.y = Math.sin(tick) * 0.3;
	}

	if (meshes.myangelH) {
		meshes.myangelH.rotation.set(10 * Math.PI / 180, 0, 0)
	}

	if (meshes.myangelbow) {
		meshes.myangelbow.rotation.set(0, 30 * Math.PI / 180, 0)
	}

	if (meshes.mycake) {
		//meshes.button.rotation.y -= 0.01;
		meshes.mycake.rotation.set(15 * Math.PI / 180, 0, 0)
		meshes.mycake.position.y = Math.sin(tick * 2) * 0.3 -2;
	}

	if (meshes.mybook) {
		//meshes.button.rotation.y -= 0.01;
		meshes.mybook.rotation.set(0, 180 * Math.PI / 180, 60 * Math.PI / 180)
		meshes.mybook.position.y = Math.sin(tick * 3) * 0.2 ;
	}

	if (meshes.myhat) {
		//meshes.button.rotation.y -= 0.01;
		meshes.myhat.rotation.set(0, 180 * Math.PI / 180, 0)
		//meshes.myhat.position.y = Math.sin(tick * 3) * 0.1 + 2.5;
	}

	if (meshes.mydoor) {
		//meshes.button.rotation.y -= 0.01;
		meshes.mydoor.rotation.set(0, 5 * Math.PI / 180,0)
		//meshes.myhat.position.y = Math.sin(tick * 3) * 0.1 + 2.5;
	}

	if (meshes.mybg) {
		//meshes.button.rotation.y -= 0.01;
		meshes.mybg.rotation.set( 20* Math.PI / 180,0,0)
		//meshes.myhat.position.y = Math.sin(tick * 3) * 0.1 + 2.5;
	}
	
	if (meshes.mymap) {
		//meshes.button.rotation.y -= 0.01;
		meshes.mymap.rotation.set( 1* Math.PI / 180,20* Math.PI / 180,0)
		//meshes.myhat.position.y = Math.sin(tick * 3) * 0.1 + 2.5;
	}

	if (meshes.mystar) {
		//meshes.button.rotation.y -= 0.01;
		meshes.mystar.rotation.set( 60* Math.PI / 180,0,0)
		//meshes.myhat.position.y = Math.sin(tick * 3) * 0.1 + 2.5;
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