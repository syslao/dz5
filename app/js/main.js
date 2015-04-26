(function() {

    var app = {

        initialize: function() {
            // console.log('Инициализация приложения');

            this.setUpListeners();

            $('input, textarea').placeholder();

        },
        setUpListeners: function() {
            // console.log('Прослушка событий включена');

            $('#showpopup').on('click', app.Popup); // модальное окно "добавть проект"
            // $('form').on('keydown', '.has-error', app.removeError); // удаляем красную обводку у элементов форм
            // $('form').on('reset', app.clearForm); // при сбросе формы удаляем также: тултипы, обводку, сообщение от сервера
            // $('#add-new-project').on('submit', app.addProject); // добавление проекта
            // $('#login').on('submit', app.login); //  авторизация пользователя
            // $('#contact-me').on('submit', app.contactMe); // отправка формы "связаться со мной""
        },

        Popup: function() {
            $('.popup-window').bPopup({
                fadeSpeed: 'slow', 
                followSpeed: 1500,
                modalColor: '#7e8c99',
                transition: 'slideDown',
                position: ['auto', 'auto']

            });

        }

    }


    app.initialize();

}());
