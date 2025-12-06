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
    function handleDate(date) {

        let date1 = new Date(date)
        let hours = date1.getHours()
        let minutes = date1.getMinutes()
        let seconds = date1.getSeconds()
        let months = date1.getMonth()
        let year = date1.getFullYear()
        let date2 = `${year}/${months + 1}  ${hours % 12 || 12}:${seconds}`

        const now = new Date()
        const past = new Date(date).getTime()
        const diffinMilliseconds = now - past

        //الثوابت 
        const Minutes = 60 * 1000
        const Hours = 60 * Minutes
        const Day = 24 * Hours
        const Week = 7 * Day
        console.log(diffinMilliseconds);


        if (diffinMilliseconds < Hours) {
            const min = Math.round(diffinMilliseconds / Minutes)
            if (min < 1) return "now"
            return `منذوا ${min} دقية`
        }
        if (diffinMilliseconds < Day) {
            const h = Math.round(diffinMilliseconds / Hours)
            return `امنذوا ${h} ساعة`
        }
        if (diffinMilliseconds < 2 * Day) {
            const d = Math.round(diffinMilliseconds / Day)
            return `امس  `
        }
        if (diffinMilliseconds < 2 * Week && diffinMilliseconds > Week) {
            const w = Math.round(diffinMilliseconds / Week)
            return "قبل اسبوع"
        }


        return date1.toLocaleDateString('ar-EG', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
        //new Date(tweet.id).toLocaleString()


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
                                    <span className="timestamp">{handleDate(tweet.id)}</span>
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