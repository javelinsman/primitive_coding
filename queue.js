function Queue(){
	this.q = []
	this.ind = 0
	
	this.push = (elem) => {
		this.q.push(elem)
	}
	this.pop = () => {
		this.ind += 1
		elem = this.q[this.ind-1]
		
		this.q[this.ind-1] = null
		return elem
	}
	this.ref = () => {
		return this.q[this.ind]
	}
	this.size = () => {
		return this.q.length - this.ind
	}
}