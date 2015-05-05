(function() {

    var app = {

        initialize: function() {


            this.setUpListeners();

            $('input, textarea').placeholder();


            (function() {
                $('.mysite-item:nth-child(3n)').css("margin-right", "0");
            })();

        },
        setUpListeners: function() {


            $('#showpopup').on('click', app.Popup);
            $('form').on('submit', app.showResult);
            $('form').on('keydown', '.error-field', app.removeError);
            $('form').on('reset', app.clearForm);
            $('form').on('change', 'input[type=file]', app.adduploadfix);
            $('form').on('change', '.error-field', app.removeError);


        },

        adduploadfix: function() {
            $in = $(this);
            var form = $('form'),
                inputerror = form.find('input#file').attr('value', $in.val());
            form.find('#file-name').text($in.val().replace(/^.*\\/, ""));
            inputerror.removeClass('error-field');
            form.find('input, textarea').trigger('hideTooltip');
            $('form').on('submit', app.showResult);
            app.validateForm($('form'))



        },


        Popup: function() {
            $('.popup-window').bPopup({
                fadeSpeed: 'slow',
                followSpeed: 1500,
                modalColor: '#7e8c99',
                transition: 'slideDown',
                position: ['auto', 'auto'],
                onClose: function() {
                    this.find('.add-site-form').trigger('reset');
                }

            })

        },


        showResult: function(ev) {
            ev.preventDefault();
            var form = $(this);
            if (app.validateForm($(this))) {}
        },

        validateForm: function(form) {
            var elements = form.find('input, textarea').not('input[type="submit"], input#reset'),
                valid = true;
            $.each(elements, function(index, val) {
                var element = $(val),
                    val = element.val(),
                    position = element.attr('qtip-position');


                if (val.length === 0) {
                    element.addClass('error-field');
                    app.createTooltip(element, position);
                    app.adduploaderror();
                    valid = false;
                }

            }); // each

            return valid;
        },
        removeError: function() {
            $(this).removeClass('error-field');
        },

        adduploaderror: function() {
            var form = $('form')
            if (form.find('input#file').hasClass('error-field')) {
                form.find('.file-form-label').addClass('error-field');
            };

        },

        clearForm: function(form) {
            var form = $(this);

            form.find('input, textarea').trigger('hideTooltip');
            form.find('.error-field').removeClass('error-field');
            form.find('input#file').attr('value', "");
            form.find('#file-name').text("Загрузите изображение");
        },

        createTooltip: function(element, position) {
            if (position === 'right') {
                position = {
                    my: 'left center',
                    at: 'right center'
                }
            } else {
                position = {
                    my: 'right center',
                    at: 'left center',
                    adjust: {
                        method: 'shift none'
                    }
                }
            }

            element.qtip({
                content: {
                    text: function() {
                        return $(this).attr('qtip-content');
                    }
                },
                show: {
                    event: 'show'
                },
                hide: {
                    event: 'keydown hideTooltip'
                },
                position: position,
                style: {
                    classes: 'qtip-mystyle qtip-rounded',
                    tip: {
                        height: 10,
                        width: 16
                    }
                }
            }).trigger('show');
        }


    }


    app.initialize();

}());
