Queue = function(){
	this.q = []
	this.ind = 0
	
	return {
		push: (elem) => {
			this.q.push(elem)
		},
		pop: () => {
			this.ind += 1
			elem = this.q[this.ind-1]
		
			this.q[this.ind-1] = null
			return elem
		},
		ref: () => {
			return this.q[this.ind]
		},
		size: () => {
			return this.q.length - this.ind
		}
	}
}