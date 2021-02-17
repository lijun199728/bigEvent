$(function() {
    $('#reg-link').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#login-link').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })
})