document.addEventListener('DOMContentLoaded', function() {
    (function(){
        var start_x, start_y
        var width = 400
        var height = 720
        var frame_height = 675
        var chat_href = 'https://chatgpt.xiaofiwu.wpjs.cc/?is_hidden_left=1'
        var chat_href = 'http://10.8.0.9:8080/?is_hidden_left=1'

        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `.info-xxx-box {
            position: fixed;
            bottom: 120px;
            right: 10px;
            background-color: #fff;
            border: 1px solid #ccc;
            padding-left: 10px;
            padding-right: 10px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            cursor: pointer
          }
          .info-xxx-box:after {
            content: "";
            position: absolute;
            top: -20px;
            right: 10px;
            border-width: 10px;
            border-style: solid;
            border-color: transparent transparent #fff transparent;
          }
          .popup-xxx-shadow {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 998;
            background-color: rgba(0, 0, 0, 0.5);
          }
          `;
        document.head.appendChild(style);
        const shadow = document.createElement('div')
        var shadow_id = randomString(10)

        shadow.classList.add('popup-xxx-shadow')
        shadow.id = shadow_id
        shadow.style.display = 'none'
        document.body.appendChild(shadow);


        const bottom_div = document.createElement('div')
        bottom_div.classList.add('info-xxx-box')
        bottom_div.innerHTML = `Chatgpt`
        document.body.appendChild(bottom_div);

        var id = randomString(10)

        bottom_div.addEventListener("click", function () {
            if (isMobile()) {
                window.location.href = chat_href
            } else {
                toggleElementVisibility(id)
                toggleElementVisibility(shadow_id)
            }
        });
        shadow.addEventListener("click", function () {
          
            toggleElementVisibility(id)
            toggleElementVisibility(shadow_id)

        })
        
        
        const div = document.createElement('div')
        div.id = id
        div.style.position = 'fixed'
        // div.style.top = 0
        div.style.display = 'none'
        div.style.left = (window.innerWidth/2-width/2) + 'px'
        div.style.top = (window.innerHeight/2-height/2) + 'px'
        div.style.cursor = 'move'
        div.style.width = width+'px'; 
        div.style.maxHeight = height+'px';
        div.style.backgroundColor = 'rgb(209 213 219)'
        div.style.zIndex = 9999

        const h4 = document.createElement('h4')
        h4.innerText = 'Chatgpt'
        h4.style.textAlign = 'center'

        window.addEventListener('resize', function(){
            div.style.left = (window.innerWidth/2-width/2) + 'px'
            div.style.top = (window.innerHeight / 2 - height / 2) + 'px'
        });


        const iframe = document.createElement('iframe')
        iframe.width = width; // iframe 的宽度
        iframe.height = frame_height; // iframe 的高度
        iframe.id = id + 'iframe';
        iframe.style.border = 'none'
        iframe.src=chat_href
        div.appendChild(iframe)
        document.body.appendChild(div);

        addListeners()

        window.addEventListener('resize', function(){
            div.style.left = (window.innerWidth/2-width/2) + 'px'
            div.style.top = (window.innerHeight / 2 - height / 2) + 'px'
        });

        function randomString(length=10) {
            var result = "";
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        function addListeners(){
            document.getElementById(id).addEventListener('mousedown', mouseDown, false);
            
            window.addEventListener('mouseup', mouseUp, false);

        }
        function mouseUp()
        {
            window.removeEventListener('mousemove', divMove, true);
        }

        function mouseDown(e) {
            var div = document.getElementById(id);
            div.style.transform = 'none'

            start_x = e.clientX - div.getBoundingClientRect().left
            start_y=e.clientY- div.getBoundingClientRect().top

            console.log(start_x, start_y, div.style.top)
            window.addEventListener('mousemove', divMove, true);
        }

        function divMove(e){
            var div = document.getElementById(id);
            //window.getComputedStyle(div).width
            div.style.position = 'fixed';
            div.style.top = (e.clientY-start_y) + 'px';
            div.style.left = (e.clientX-start_x) + 'px';
        }
        function isMobile() {
            return window.innerWidth <= 768;
        }
        function toggleElementVisibility(elementId) {
            var element = document.getElementById(elementId);
            if (element.style.display === "none") {
              element.style.display = "block";
            } else {
              element.style.display = "none";
            }
          }
    })()
})