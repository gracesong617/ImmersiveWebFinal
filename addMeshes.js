import {
	BoxGeometry,
	MeshBasicMaterial,
	MeshStandardMaterial,
	Mesh,
	SphereGeometry,
	MeshPhongMaterial,
	MeshPhysicalMaterial,
	TextureLoader,
	BufferGeometry,
	Shape,
	ShapeGeometry,
	ExtrudeGeometry,
	CircleGeometry,
	TorusGeometry,
	ConeGeometry,
	CylinderGeometry,
	PlaneGeometry,
	LinearMipmapLinearFilter,
	WebGLRenderer,
	CapsuleGeometry,
	MeshMatcapMaterial,
	TetrahedronGeometry

} from 'three'

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

const renderer = new WebGLRenderer();
const loader = new TextureLoader()

loader.generateMipmaps = true;
loader.minFilter = LinearMipmapLinearFilter;
loader.anisotropy = renderer.capabilities.getMaxAnisotropy();


export const background1 = () => {
	const color = loader.load('next.png')
	const background1 = new PlaneGeometry(2,2)
	const background1Material = new MeshBasicMaterial({
		map:color,
	    transparent: true,  })
	const plane1 = new Mesh(background1, background1Material)
	plane1.position.set(-6, 0, 1)
	plane1.scale.set(0,0,0)
	plane1.name = 'playernext'

	return plane1
}
//stop
export const background2 = () => {
	const color = loader.load('stop.png')
	const background1 = new PlaneGeometry(1.2,1.2)
	const background1Material = new MeshBasicMaterial({
		map:color,
	    transparent: true,  })
	const plane1 = new Mesh(background1, background1Material)
	plane1.position.set(5, 0, 1)
	plane1.scale.set(0,0,0)
	plane1.name = 'playerstop'

	return plane1
}
//replay
export const background3 = () => {
	const color = loader.load('play.png')
	const background1 = new PlaneGeometry(1.2,1.2)
	const background1Material = new MeshBasicMaterial({
		map:color,
	    transparent: true,  })
	const plane1 = new Mesh(background1, background1Material)
	plane1.position.set(7, 0, 1)
	plane1.scale.set(0,0,0)
	plane1.name = 'playerreplay'

	return plane1
}


export const background = () => {
	const background = new PlaneGeometry(100, 100)
	const backgroundMaterial = new MeshBasicMaterial({ color:0xD8BFD8 })
	const plane = new Mesh(background, backgroundMaterial)
	plane.position.set(0, 0, -100)
	// boxMesh.userData.name = 'target1'
	return plane
}


export const cover = () => {
	const covergeo = new PlaneGeometry(100, 100)
	const coverMaterial = new MeshBasicMaterial({ color:0xD8BFD8 })
	const cover = new Mesh(covergeo, coverMaterial)
	cover.position.set(0, 0, 10)
	cover.name = 'cover'
	// boxMesh.userData.name = 'target1'
	return cover
}




export const button = () => {
	const color = loader.load('cover1.png')
	const buttongeo = new PlaneGeometry(8,4)
	const buttonMaterial = new MeshBasicMaterial({ 
		//color:0x9FC5E8 
		map:color,
	    transparent: true,
	})//blue
	const button = new Mesh(buttongeo, buttonMaterial)
	button.position.set(0, 0, 15)
	button.scale.set(1, 1, 2)
	button.name = 'button'
	// boxMesh.userData.name = 'target1'
	return button
}

export const girlcover = () => {
	const color = loader.load('girlcover.png')
	const girlgeo = new PlaneGeometry(10,14)
	const girlMaterial = new MeshBasicMaterial({ 
		//color:0x9FC5E8 
		map:color,
	    transparent: true,

	})
	const girlcover = new Mesh(girlgeo, girlMaterial)
	girlcover.position.set(0, 0, 14)
	girlcover.scale.set(1, 1, 1)
	girlcover.name = 'girlcover'
	return girlcover
}


export const magicCircle = () => {
	const color = loader.load('Seal381.png')
	const circle = new CircleGeometry(8,32)
	const circleMaterial = new  MeshBasicMaterial({ 
		map:color,
		transparent: true
	})
	const magicCircle = new Mesh(circle, circleMaterial)
	magicCircle.position.set(0, 0, -7)
	// boxMesh.userData.name = 'target1'
	return magicCircle
}

