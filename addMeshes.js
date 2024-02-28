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
	WebGLRenderer
} from 'three'

const renderer = new WebGLRenderer();
const loader = new TextureLoader()
loader.generateMipmaps = true;
loader.minFilter = LinearMipmapLinearFilter;
loader.anisotropy = renderer.capabilities.getMaxAnisotropy();

export const addBoilerPlateMeshes = () => {
	const box = new BoxGeometry(1, 1, 1)
	const boxMaterial = new MeshBasicMaterial({ color: 0xff0000 })
	const boxMesh = new Mesh(box, boxMaterial)
	boxMesh.userData.name = 'target1'
	boxMesh.name = 'target1'
	boxMesh.position.set(-2, 0, 5)
	return boxMesh
}

export const background = () => {
	const background = new PlaneGeometry(100, 100)
	const backgroundMaterial = new MeshBasicMaterial({ color:0xD8BFD8 })
	const plane = new Mesh(background, backgroundMaterial)
	plane.position.set(0, 0, -5)
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

	})//blue
	const girlcover = new Mesh(girlgeo, girlMaterial)
	girlcover.position.set(0, 0, 14)
	girlcover.scale.set(1, 1, 1)
	girlcover.name = 'girlcover'
	// boxMesh.userData.name = 'target1'
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
	magicCircle.position.set(0, 0, 0)
	// boxMesh.userData.name = 'target1'
	return magicCircle
}

export const addStandardMesh = () => {
	const box = new BoxGeometry(1, 1, 1)
	const boxMaterial = new MeshStandardMaterial({ color: 0x00ff00 })
	const boxMesh = new Mesh(box, boxMaterial)
	boxMesh.userData.name = 'target2'
	boxMesh.name = 'target2'
	boxMesh.position.set(2, 0, 5)
	return boxMesh
}
