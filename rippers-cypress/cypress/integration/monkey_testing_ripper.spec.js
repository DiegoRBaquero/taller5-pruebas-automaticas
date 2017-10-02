describe('Los estudiantes under monkeys', function () {
  it('visits los estudiantes and survives monkeys', function () {
    cy.visit('https://losestudiantes.co')
    cy.contains('Cerrar').click()
    cy.wait(1000)
    randomEvent(10)
  })
})

function randomEvent (monkeysLeft) {
  monkeysLeft = monkeysLeft - 1
  switch(getRandomInt(1, 4)) {
    case 1:
      randomLink()
      break
    case 2:
      randomInput()
      break
    case 3:
      randomCombo()
      break
    case 4:
      randomButton()
      break
  }
  if (monkeysLeft > 0) {
    cy.wait(1000)
    randomEvent(monkeysLeft)
  }
}

function randomLink () {
  cy.get('a').then($links => {
    let randomLink = $links.get(getRandomInt(0, $links.length))
    while (Cypress.dom.isHidden(randomLink)) {
      randomLink = $links.get(getRandomInt(0, $links.length))
    }
    cy.wrap(randomLink).click({force: true})
  })
}

function randomButton () {
  cy.get('button').then($buttons => {
    let randomButton = $buttons.get(getRandomInt(0, $buttons.length))
    while (Cypress.dom.isHidden(randomButton)) {
      randomButton = $buttons.get(getRandomInt(0, $buttons.length))
    }
    cy.wrap(randomButton).click({force: true})
  })
}

function randomCombo () {
  cy.get('select').then($buttons => {
    let randomSelect = $buttons.get(getRandomInt(0, $buttons.length))
    while (Cypress.dom.isHidden(randomSelect)) {
      randomSelect = $buttons.get(getRandomInt(0, $buttons.length))
    }
    let options = cy.wrap(randomSelect).get('option').then($options => {
      let option = $options.get(getRandomInt(0, $options.length))
      cy.wrap(randomSelect).select(option.value, {force: true})
    })
  })
}

function randomInput () {
  cy.get('input[type="text"]').then($inputs => {
    let randomInput = $inputs.get(getRandomInt(0, $inputs.length))
    while (Cypress.dom.isHidden(randomInput)) {
      randomInput = $inputs.get(getRandomInt(0, $inputs.length))
    }
    cy.wrap(randomInput).type('Test' + Math.floor(Math.random()*10000), {force: true})
  })
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
