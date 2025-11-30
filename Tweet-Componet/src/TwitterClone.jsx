import { useState, useEffect, useRef } from 'react'



const LOCAL_STORAGE_KEY = "react_tweets"


export function Tweet() {
    const [tweetList, setTweetList] = useState(getInitialTweets())

    const input = useRef(null)

    function getInitialTweets() {

        // 1. محاولة جلب البيانات المخزنة
        const storedTweets = localStorage.getItem(LOCAL_STORAGE_KEY);

        // 2. إذا وُجدت، قم بإرجاع القيمة المحولة إلى كائن (Parsed value)
        if (storedTweets) {
            return JSON.parse(storedTweets);
        }

        // 3. إذا لم تُوجد، أعد مصفوفة فارغة
        return [];
    };

    function handleNewTweet() {
        let tweet = input.current.value
        let obj = {
            tweet: tweet,
            id: new Date().toISOString()


        }

        setTweetList((prev) => [obj, ...prev])
        input.current.value = ''

    }
    function deleteTweet(id) {
        setTweetList((prev) => {
            const updatetweet = prev.filter((e) => e.id !== id)
            return updatetweet
        })
    }
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tweetList))
    }, [tweetList])
    return (
        <>
            <div className="container">
                <div className="inputCon">
                    <input ref={input} type="textarea" name="" id="textarea" />
                    <button onClick={handleNewTweet}>انشر</button>
                </div>
                <div className="tweetList">
                    {tweetList.map((tweet) => {
                        return (
                            <div key={tweet.id} className="tweetItem">
                                <p className="tweetText">{tweet.tweet}</p>
                                <div className="option">
                                    <span className="timestamp">{new Date(tweet.id).toLocaleString()}</span>
                                    <span className="delete" onClick={() => {
                                        deleteTweet(tweet.id)
                                    }}>حذف</span>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

        </>
    )
}