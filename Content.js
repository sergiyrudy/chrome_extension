let wordObject = {
	Cat: [ 'Dog', 'Rat', 'bat' ],
	Helo: [ 'hello', 'Help', 'Hell' ],
	heldp: [ 'help', 'held', 'hello' ]
}

document.addEventListener('keypress', (e) => {
	let target = e.target
	let checkAttribute = target.getAttribute('contentEditable')

	if (e.key === ' ' && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
		createElementForInputTextArea(target)
	} else if (e.key === ' ' && checkAttribute) {
		createPopupForContentEditableElement(target)
	}
})

document.addEventListener('mouseover', (e) => {
	if (e.target.tagName === 'IFRAME') {
		e.target.contentDocument.addEventListener('keypress', (e) => {
			let target = e.target
			let checkAttribute = target.getAttribute('contentEditable')

			if (e.key === ' ' && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
				createElementForInputTextArea(target)
			} else if (e.key === ' ' && checkAttribute) {
				createPopupForContentEditableElement(target)
			}
		})
	}
})

function createPopupForContentEditableElement(target) {
	let keyPresses = []
	let myWord
	let sel = window.getSelection()
	let position = sel.getRangeAt(0).startOffset

	target.onkeypress = function(e) {
		e = e || window.event
		let key = e.keyCode || e.which
		keyPresses.push(key)

		myWord = keyPresses.map((el) => String.fromCharCode(el)).join('')

		for (let word in wordObject) {
			if (myWord === word) {
				let popUpContent = document.createElement('div')
				let popUpClose = document.createElement('a')

				popUpContent.classList.add('popup__content')
				popUpClose.classList.add('popup__close')
				popUpClose.innerText = 'X'
				popUpContent.append(popUpClose)

				target.parentNode.append(popUpContent)

				popUpClose.addEventListener('click', () => {
					popUpContent.remove()
				})

				let arr = wordObject[word]

				arr.map((el) => {
					let wordButton = document.createElement('button')
					wordButton.classList.add('popup__wordbutton')
					wordButton.innerText = el
					popUpContent.append(wordButton)
				})

				popUpContent.addEventListener('click', (e) => {
					if (e.target.tagName === 'BUTTON') {
						target.textContent =
							target.textContent.substring(0, position + 1) +
							e.target.innerText +
							target.textContent.substring(position + word.length + 1)
						popUpContent.remove()
					}
				})
			}
		}
	}
}

function createElementForInputTextArea(target) {
	let keyPresses = []
	let myWord
	target.onkeypress = function(e) {
		e = e || window.event
		let key = e.keyCode || e.which
		keyPresses.push(key)
		const position = e.target.selectionStart

		myWord = keyPresses.map((el) => String.fromCharCode(el)).join('')
		for (let word in wordObject) {
			if (myWord === word) {
				let popUpContent = document.createElement('div')
				let popUpClose = document.createElement('a')

				popUpContent.classList.add('popup__content')
				popUpClose.classList.add('popup__close')
				popUpClose.innerText = 'X'
				popUpContent.append(popUpClose)

				target.parentNode.append(popUpContent)

				popUpClose.addEventListener('click', () => {
					popUpContent.remove()
				})

				let arr = wordObject[word]

				arr.map((el) => {
					let wordButton = document.createElement('button')
					wordButton.classList.add('popup__wordbutton')
					wordButton.innerText = el
					popUpContent.append(wordButton)
				})

				popUpContent.addEventListener('click', (e) => {
					if (e.target.tagName === 'BUTTON') {
						target.value =
							target.value.substring(0, position - word.length + 1) +
							e.target.innerText +
							target.value.substring(position + 1)

						popUpContent.remove()
					}
				})
			}
		}
	}
}
