function Queue(){
	this.q = []
	
	this.push = (elem) => {
		this.q.push(elem)
	}
	this.pop = () => {
		return this.q.shift()
	}
	this.ref = () => {
		return this.q[0]
	}
	this.size = () => {
		return this.q.length
	}
}