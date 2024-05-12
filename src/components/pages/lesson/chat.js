import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import Button from "../../button";


const Chat = () => {
    const params = useParams();
    const {user} = useAuth();
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!user) return

        const connection = new WebSocket(`ws://127.0.0.1:8080/ws/${params.id}?connectId=${user.profile}`);
        setSocket(connection);

        return () => connection.close();
    }, [user])

    useEffect(() => {
        if (!socket) return

        socket.onmessage = function (event) {
            // if (messages.length === 0 && Array.isArray(JSON.parse(event.data))) {
            //     setMessages(JSON.parse(event.data));
            // }
            // else {
            //     setMessages(prevState => [...prevState, JSON.parse(event.data)]);
            // }

            if (messages.length === 0 && Array.isArray(JSON.parse(event.data))) {
                const arr = [];
                JSON.parse(event.data).map(mess => arr.push(JSON.parse(mess)))
                setMessages(arr);
            }
            else {
                // console.log(event.data);
                // console.log(JSON.parse(event.data));
                setMessages(prevState => [...prevState, JSON.parse(event.data)]);
            }
        };

    }, [socket])

    // if (socket) {
    //     socket.onmessage = function (event) {
    //         // if (messages.length === 0 && Array.isArray(JSON.parse(event.data))) {
    //         //     setMessages(JSON.parse(event.data));
    //         // }
    //         // else {
    //         //     setMessages(prevState => [...prevState, JSON.parse(event.data)]);
    //         // }
    //
    //         if (messages.length === 0 && Array.isArray(JSON.parse(event.data))) {
    //             const arr = [];
    //             JSON.parse(event.data).map(mess => arr.push(JSON.parse(mess)))
    //             setMessages(arr);
    //         } else {
    //             // console.log(event.data);
    //             // console.log(JSON.parse(event.data));
    //             setMessages(prevState => [...prevState, JSON.parse(event.data)]);
    //         }
    //     };
    // }

    useEffect(() => {
        console.log(messages);
    }, [messages])

    useEffect(() => {
        const input = document.querySelector('#inputChat');
        input.scrollTop = input.scrollHeight
    })

    const handleSendMessage = (e) => {
        e.preventDefault();

        const input = document.querySelector('#inputChat');
        const message = {"user":`${user.first_name} ${user.last_name}`, "message":input.value.toString()}

        socket.send(JSON.stringify(message));
        input.value = '';
    }

    return (
        <div
            className={'h-[462px] grid grid-rows-[1fr,_max-content] gap-1 p-1 bg-royal-blue-200 dark:bg-royal-blue-950'}>
            <div className={'flex flex-col gap-1 items-start justify-start max-h-full overflow-y-scroll'}>
                {messages && messages.map((message, index) => {
                    // console.log('before: ', JSON.parse(message));
                    // const repl = message.replace(/\\n/g, '').replace(/\\t/g, '').replace(/\//g, '');
                    // console.log('after: ', JSON.parse(repl));

                    if (Array.isArray(message)) return

                    if (typeof message === 'string') {
                        const obj = JSON.parse(message);

                        return (
                            <div key={index} className={'flex gap-1'}>
                                <span>{`${obj.user}:`}</span>
                                <span>{obj.message}</span>
                            </div>
                        )
                    }

                    return (
                        <div key={index} className={'flex gap-1'}>
                            <span>{`${message.user}:`}</span>
                            <span>{message.message}</span>
                        </div>
                    )
                })}
            </div>
            <form className={'flex gap-1'} onSubmit={handleSendMessage}>
                <input placeholder={'Отправить сообщение'} className={'p-1 w-full'} id={'inputChat'}/>
                <Button w={'w-max'}>Отправить</Button>
            </form>
        </div>
    );
};

export default Chat;