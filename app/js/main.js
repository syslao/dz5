(function() {

    var app = {

        initialize: function() {
            // console.log('Инициализация приложения');

            this.setUpListeners();

            $('input, textarea').placeholder();


        },
        setUpListeners: function() {
            // console.log('Прослушка событий включена');

            $('#showpopup').on('click', app.Popup);
            $('form').on('submit', app.showResult);
            $('form').on('keydown', '.error-field', app.removeError);
            $('form').on('reset', app.clearForm);
            $('form').on('change', 'input[type=file]', app.addupload);


            // $('input[type=file]').onchange(function(e){
            //     $in=$(this);
            //     $('form').find('input.file-input-text').attr('value', $in.val().replace(/^.*\\/, ""));
            

            // });






        },

        addupload: function() {
            $in=$(this);
            $('form').find('input.file-input-text').attr('value', $in.val().replace(/^.*\\/, ""));


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
            var elements = form.find('input, textarea').not('input[type="submit"], input.img-input, input#reset'),
                valid = true;
            $.each(elements, function(index, val) {
                var element = $(val),
                    val = element.val(),
                    position = element.attr('qtip-position');
                    

                if (val.length === 0) {
                    element.addClass('error-field');
                    // if (element.hasClass('form-input img-input error-field')) form.find('.file-input-text').addClass('error-field');

                    // if (element.class = 'file-input-text')


                    // form.find('.file-input-text').addClass('error-field');

                    app.createTooltip(element, position);
                    valid = false;
                }

            }); // each

            return valid;
        },
        removeError: function() {
            $(this).removeClass('error-field');
        },
        clearForm: function(form) {
            var form = $(this);

            form.find('input, textarea').trigger('hideTooltip');
            form.find('.error-field').removeClass('error-field');
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
