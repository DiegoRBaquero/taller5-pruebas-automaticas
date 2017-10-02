function loadScript (callback) {
  const s = document.createElement('script')
  s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js'
  if (s.addEventListener) {
    s.addEventListener('load', callback, false)
  } else if (s.readyState) {
    s.onreadystatechange = callback
  }
  document.body.appendChild(s)
}

function unleashGremlins (ttl, callback) {
  function stop () {
    horde.stop()
    callback()
  }

  gremlins.species.clicker()
    .clickTypes(['click']) // which mouse event types will be triggered
    .canClick(function(element) {
      return $(element).is('a') || $(element).is('button');
    })

  gremlins.species.formFiller()
    .canFillElement(function(element) {
      return $(element).is('textarea') || $(element).is('input[type="text"]') || $(element).is('input[type="password"]') || $(element).is('input[type="number"]') || $(element).is('input[type="email"]');
    })

  const horde = gremlins.createHorde()
  horde.seed(1234)

  horde.strategy(gremlins.strategies.distribution()
    .distribution([0.4, 0.1, 0.2, 0.1, 0.2]) // Clicker 0.4, formFiller 0.2, Typer 0.2, rest 0.1
  )

  horde.after(callback)
  window.onbeforeunload = stop
  setTimeout(stop, ttl)
  horde.unleash()
}

describe('Monkey testing with gremlins ', function () {
  it('it should not raise any error', function () {
    browser.url('/')
    browser.click('button=Cerrar')

    browser.timeoutsAsyncScript(60000)
    browser.executeAsync(loadScript)

    browser.timeoutsAsyncScript(60000)
    browser.executeAsync(unleashGremlins, 50000)
  })

  afterAll(function () {
	 browser.log('browser').value.forEach(function (log) {
     browser.logger.info(log.message.split(' ')[2]);
	 })
  })
})
