import { assert } from 'console'
import { Component } from './component'

class Main implements Component {
	paragraph: HTMLParagraphElement

	render(){
		this.paragraph = document.createElement('p')
		
		this.paragraph.innerText = "Hello world!"

		return [this.paragraph]
	}
}

const body: HTMLBodyElement = document.getElementsByTagName('body')[0]
assert(body != null, "Body does not exist!")

const main = new Main()

main.render().forEach((n) => {
	body.append(n)
})