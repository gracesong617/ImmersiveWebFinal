import './style.css'
import * as THREE from 'three'
import { addLight, addLight1, addLight2, addLightback } from './addLights'
import { background, magicCircle, cover, button, girlcover,background1,background2,background3 } from './addMeshes'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Model from './Model'
import gsap from 'gsap'
import { post } from './post'
import { DragControls } from 'three/addons/controls/DragControls.js';


const renderer = new THREE.WebGLRenderer({ antialias: true })

var width = window.innerWidth;
var height = window.innerHeight;
var k = width / height;
var s = 8;

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);

const textElement = document.querySelector('.info');
const textElement1 = document.querySelector('.info1');
const textElement2 = document.querySelector('.info2');
const textElement3 = document.querySelector('.info3');
const textElement4 = document.querySelector('.info4');


const tloader = new THREE.TextureLoader()
const texture = tloader.load('matcap13.png')
const texture1 = tloader.load('matcap21.png')
const texture2 = tloader.load('matcap31.png')
const texture3 = tloader.load('matcap31.png')
const texture4 = tloader.load('matcap31.png')


const scene = new THREE.Scene()
const meshes = {}
const lights = {}
const composer = post(scene, camera, renderer)
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
//pointer.x or pointer.y
const mixers = []

const listener = new THREE.AudioListener()
camera.add(listener)

const sound1 = new THREE.Audio(listener)
const sound2 = new THREE.Audio(listener)
const sound3 = new THREE.Audio(listener)
const audioLoader = new THREE.AudioLoader()

audioLoader.load('/music1.mp3', function (buffer) {
	sound1.setBuffer(buffer)
	sound1.setVolume(0.3);
})

audioLoader.load('/music2.m4a', function (buffer) {
	sound2.setBuffer(buffer)
	sound2.setVolume(0.1);
})

audioLoader.load('/music3.mp3', function (buffer) {
	sound3.setBuffer(buffer)
	sound3.setVolume(0.1);
})


const songs = [sound1, sound2, sound3]
var currentSongIndex = 0;
var isPlaying = false;

let volume1 = 0.3;
let volume2 = 0.1
let volume3 = 0.1
const volumeStep = 0.05;

window.addEventListener('wheel', function (event) {
	const currentSound = songs[currentSongIndex];
	if (currentSound === sound1) {
		if (event.deltaY < 0) {
			volume1 = Math.min(1, volume1 + volumeStep);
		} else {
			volume1 = Math.max(0.3, volume1 - volumeStep);
		}
		sound1.setVolume(volume1)
	}
	if (currentSound === sound2) {
		if (event.deltaY < 0) {
			volume2 = Math.min(0.6, volume2 + volumeStep);
		} else {
			volume2 = Math.max(0.1, volume2 - volumeStep);
		}
		sound2.setVolume(volume2)
	}
	if (currentSound === sound3) {
		if (event.deltaY < 0) {
			volume3 = Math.min(0.6, volume3 + volumeStep);
		} else {
			volume3 = Math.max(0.1, volume3 - volumeStep);
		}
		sound3.setVolume(volume3)
	}
});




const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.08
controls.enablePan = false
controls.enableZoom = true
controls.maxZoom = 2;
controls.minZoom = 1;
controls.minAzimuthAngle = -10 * Math.PI / 180;
controls.maxAzimuthAngle = 10 * Math.PI / 180;
controls.minPolarAngle = 70 * Math.PI / 180;
controls.maxPolarAngle = 95 * Math.PI / 180;

const clock = new THREE.Clock()


const interactable = []
const dragObjects = []

const modelCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
modelCamera.position.z = 5;



init()
function init() {
	//set up our renderer default settings, add scene/canvas to webpage
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	meshes.background = background()
	meshes.magicCircle = magicCircle()
	meshes.cover = cover()
	meshes.button = button()
	meshes.girlcover = girlcover()

	meshes.background1 = background1()
	meshes.background2 = background2()
	meshes.background3 = background3()
	


	lights.default = addLight()
	lights.add = addLight1()
	lights.add2 = addLight2()
	lights.addback = addLightback()

	scene.add(lights.default)
	scene.add(lights.add)
	scene.add(lights.add2)
	scene.add(lights.addback)
	scene.add(sound1)

	scene.add(meshes.background)
	scene.add(meshes.magicCircle)


	scene.add(meshes.cover)
	scene.add(meshes.button)
	scene.add(meshes.girlcover)
	scene.add(meshes.background1)
	scene.add(meshes.background2)
	scene.add(meshes.background3)


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
		scale: new THREE.Vector3(0.01, 0.01, 0.01),
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
		position: new THREE.Vector3(-10, -10, 1),
		scale: new THREE.Vector3(0.001, 0.001, 0.001),
		mixers: mixers,
		replace: true,
		animationState: true,
		container: dragObjects,

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
		position: new THREE.Vector3(-8, -6, 1),
		scale: new THREE.Vector3(0.001, 0.001, 0.001),
		container: dragObjects,
	})
	heart.init()


	const bow = new Model({
		url: '/gift_bow.glb',
		scene: scene,
		meshes: meshes,
		name: 'mybow',
		position: new THREE.Vector3(9.5, 1, 1),
		scale: new THREE.Vector3(0.001, 0.001, 0.001),
		mixers: mixers,
		replace: texture1,
		animationState: true,
		container: dragObjects,
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
		scale: new THREE.Vector3(0.001, 0.001, 0.001),
		container: dragObjects,
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
		position: new THREE.Vector3(8, -4, 0),
		scale: new THREE.Vector3(0, 0, 0),
		container: dragObjects,
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
		position: new THREE.Vector3(12, -2, 0),
		scale: new THREE.Vector3(0, 0, 0),
		container: dragObjects,
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
		position: new THREE.Vector3(-7, -6, 6),
		scale: new THREE.Vector3(6, 6, 6),
		container: dragObjects,
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
		scale: new THREE.Vector3(0.01, 0.01, 0.01),
		container: dragObjects,

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
		scale: new THREE.Vector3(0, 0, 0),
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
		position: new THREE.Vector3(0, -7.6, -5),
		scale: new THREE.Vector3(0, 0, 0),
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
		position: new THREE.Vector3(0, -7.6, 3),
		scale: new THREE.Vector3(0, 0, 0),
		container: interactable,
	})
	bg.init()



	const star = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/star.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		replace: texture2,
		name: 'mystar',
		position: new THREE.Vector3(-2, 3.2, -20),
		scale: new THREE.Vector3(0, 0, 0),
		container: interactable,
	})
	star.init()

}





function raycast() {
	window.addEventListener('mousemove', (event) => {
		pointer.x = (event.clientX / window.innerWidth) * 2 - 1
		pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
		raycaster.setFromCamera(pointer, camera)

		const intersects = raycaster.intersectObjects(scene.children)
		const interactabledObject = intersects[0].object.name;


		if (interactabledObject == 'Door_1'
			|| interactabledObject == 'Door_2'
			|| interactabledObject == 'button'
			|| interactabledObject == 'Bow__0'
			|| interactabledObject == 'Crystal_Heart_Crystal_Heart_Mat_0'
			|| interactabledObject == 'can_low'
			|| interactabledObject == '立方体002'
			|| interactabledObject == '立方体002_1'
			|| interactabledObject == '円柱007_1'
			|| interactabledObject == '円柱007'
			|| interactabledObject == 'Cap'
			|| interactabledObject == 'TorusKnot004_4'
			|| interactabledObject == 'kami'
			|| interactabledObject == 'playernext'
			|| interactabledObject == 'playerstop'
			|| interactabledObject == 'playerreplay'
		) {
			document.body.style.cursor = 'url("cursor3.png"), pointer'
		} else {
			document.body.style.cursor = 'url("cursor.png"),auto'
		}


	})




	window.addEventListener('click', (event) => {
		pointer.x = (event.clientX / window.innerWidth) * 2 - 1
		pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
		raycaster.setFromCamera(pointer, camera)

		const intersects = raycaster.intersectObjects(scene.children)

		for (let i = 0; i < intersects.length; i++) {

			const clickedObject = intersects[i].object.name;
			console.log('Clicked object:', intersects[i].object.name);

			if (clickedObject == 'playernext') {
				songs[currentSongIndex].stop();
				currentSongIndex = (currentSongIndex + 1) % songs.length;
				songs[currentSongIndex].play();
	
			}

			if (clickedObject == 'playerstop') {
				songs[currentSongIndex].pause();
		
			}

			if (clickedObject == 'playerreplay') {
				songs[currentSongIndex].play();

			}

			if (clickedObject == 'button') {
				meshes.cover.visible = false;
				meshes.button.visible = false
				meshes.girlcover.visible = false;
				scene.remove(meshes.cover)
				scene.remove(meshes.button)
				scene.remove(meshes.girlcover)
				// const audio = document.querySelector('.introAudio')
				// audio.play()
				sound1.play()

				controls.enabled = true
			}

			if (clickedObject == 'Door_1') {
				scene.remove(meshes.mydoor)
				textElement.style.display = 'block';
				textElement1.style.display = 'block';
				textElement2.style.display = 'block';
				textElement3.style.display = 'block';
				textElement4.style.display = 'block';
				gsap.to(meshes.background1.scale, {
					duration: 1,
					x: 1,
					y: 1,
					z: 1,
				});
					gsap.to(meshes.background2.scale, {
					duration: 1,
					x: 1,
					y: 1,
					z: 1,
				});
					gsap.to(meshes.background3.scale, {
					duration: 1,
					x: 1,
					y: 1,
					z: 1,
				});
				gsap.to(meshes.mygirl.scale, {
					duration: 0.1,
					x: 15,
					y: 15,
					z: 15,
				});
				gsap.to(meshes.heart1.scale, {
					duration: 0.5,
					x: 1,
					y: 1,
					z: 1,
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

				intersects[i].object.material.matcap = texture;
				intersects[i].object.material.needsUpdate = true


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
				intersects[i].object.material.matcap = texture;
				intersects[i].object.material.needsUpdate = true
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
				intersects[i].object.material.matcap = texture3;
				intersects[i].object.material.needsUpdate = true

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
			//cake
			if (clickedObject == 'TorusKnot004_4') {
				intersects[i].object.material.matcap = texture4;
				intersects[i].object.material.needsUpdate = true

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
				intersects[i].object.material.matcap = texture2;
				intersects[i].object.material.needsUpdate = true
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

		}



	})
}



function resize() {
	window.addEventListener('resize', () => {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var k = width / height;
		renderer.setSize(width, height);
		camera.left = -s * k;
		camera.right = s * k;
		camera.top = s;
		camera.bottom = -s;
		camera.aspect = k;
		camera.updateProjectionMatrix();
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


	meshes.background1.position.y = Math.sin(tick * 3) * 0.3 + 6;
	meshes.background2.position.y = Math.sin(tick * 3) * 0.3 + 6;
	meshes.background3.position.y = Math.sin(tick * 3) * 0.3 + 6;


	if (meshes.mybow) {
		meshes.mybow.position.y = Math.sin(tick * 3) * 0.2 + 3;
	}

	if (meshes.mybottle) {
		meshes.mybottle.position.y = Math.sin(tick * 3.5) * 0.2 - 4;
		meshes.mybottle.rotation.y += 0.008
	}
	if (meshes.mybear) {
		meshes.mybear.position.y = Math.sin(tick * 3) * 0.2 + 5;
		meshes.mybear.rotation.set(15 * Math.PI / 180, 0, 0)

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
		meshes.mycake.position.y = Math.sin(tick * 2) * 0.3 - 2;

	}

	if (meshes.mybook) {
		//meshes.button.rotation.y -= 0.01;
		meshes.mybook.rotation.set(0, 180 * Math.PI / 180, 60 * Math.PI / 180)
		meshes.mybook.position.y = Math.sin(tick * 3) * 0.2;
	}

	if (meshes.myhat) {
		//meshes.button.rotation.y -= 0.01;
		meshes.myhat.rotation.set(0, 180 * Math.PI / 180, 0)
		//meshes.myhat.position.y = Math.sin(tick * 3) * 0.1 + 2.5;
	}

	if (meshes.mydoor) {
		//meshes.button.rotation.y -= 0.01;
		meshes.mydoor.rotation.set(0, 5 * Math.PI / 180, 0)
		//meshes.myhat.position.y = Math.sin(tick * 3) * 0.1 + 2.5;
	}

	if (meshes.mybg) {
		//meshes.button.rotation.y -= 0.01;
		meshes.mybg.rotation.set(20 * Math.PI / 180, 0, 0)
		//meshes.myhat.position.y = Math.sin(tick * 3) * 0.1 + 2.5;
	}

	if (meshes.mymap) {
		//meshes.button.rotation.y -= 0.01;
		meshes.mymap.rotation.set(1 * Math.PI / 180, 20 * Math.PI / 180, 0)
		//meshes.myhat.position.y = Math.sin(tick * 3) * 0.1 + 2.5;
	}

	if (meshes.mystar) {
		//meshes.button.rotation.y -= 0.01;
		meshes.mystar.rotation.set(60 * Math.PI / 180, 0, 0)
		//meshes.myhat.position.y = Math.sin(tick * 3) * 0.1 + 2.5;
	}


	renderer.render(scene, camera)
}
