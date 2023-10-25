import { StatusBar } from '@capacitor/status-bar';
import {useEffect, useRef, useState} from "react";
import Movie from "./components/Movie"
import Seat from "./components/Seat";
import Lottie from 'react-lottie';
import successAnim from "./lotties/success"
import {days, movieList, time} from "./data/";
import {selectDayOrTime, selectMovie} from "./utils/selector";

export default function Cinefora() {
  useEffect(() => {
    StatusBar.setOverlaysWebView({ overlay: true });
  }, []);

  const [xPos, setXPos] = useState(0)
  const [selectedMovie, setSelectedMovie] = useState(0)
  const [currentScreen, setCurrentScreen] = useState("main")
  const [checkedSeats, setCheckedSeats] = useState(0)
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedTime, setSelectedTime] = useState(0)
  const [dayPos, setDayPos] = useState(0)
  const [timePos, setTimePos] = useState(0)
  const bgScrollElem = useRef();
  const [closeCurtains, setCloseCurtains] = useState(false)

  useEffect(() => {
    let scrollPos = window.innerWidth * selectedMovie

    bgScrollElem.current.scrollTo({
      behavior: 'smooth',
      left: scrollPos
    })
  }, [selectedMovie]);

  const scrollHandler = (e) => {
    setXPos(e.target.scrollLeft)
  }

  useEffect(() => {
    setSelectedMovie(selectMovie(xPos))
  }, [xPos])

  const handleCheck = (e) => {
    if (e.target.checked) {
      setCheckedSeats(v => v + 1)
    } else {
      setCheckedSeats(v => v - 1)
    }
  }
  const scrollDayHandler = (e) => {
    setDayPos(e.target.scrollTop)
  }

  useEffect(() => {
    setSelectedDay(selectDayOrTime(dayPos));
  }, [dayPos])

  const scrollTimeHandler = (e) => {
    setTimePos(e.target.scrollTop)
  }

  useEffect(() => {
    setSelectedTime(selectDayOrTime(timePos));
  }, [timePos])

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const btnHandler = () => {
    if (currentScreen === "main") {
      setCurrentScreen("pay")
    } else if (currentScreen === "pay") {
      setCurrentScreen("success")
      setTimeout(()=>{
        setCloseCurtains(true)
      },2000)
      setTimeout(() => {
        setCurrentScreen("qr")
      }, 3000);
      setTimeout(()=>{
        setCloseCurtains(false)
      },3500)
    }
  }

  const backBtn = ()=>{
    setSelectedTime(0)
    setSelectedDay(0)
    setCurrentScreen("main")
  }

  return (
    <>
      <div ref={bgScrollElem} className={`bg-scroll`}>
        {
          movieList.map(movie => {
            return <img src={movie.banner} alt="bg"/>
          })
        }
      </div>
      <div className="template">
        <div className={`success${currentScreen === "success" || currentScreen === "qr" ? " fullscreen" : ""}`}>
          <img className={`top-curtain`} src="/curtain/top.webp" alt=""/>
          <img className={`left-curtain${closeCurtains ?" closed":""}`} src="/curtain/left.webp" alt=""/>
          <img className={`right-curtain${closeCurtains ?" closed":""}`} src="/curtain/right.webp" alt=""/>
          {
              currentScreen === "success" && <Lottie
                  options={defaultOptions}
                  height={200}
                  width={200}
              />
          }

          {
              currentScreen === "qr" && <div className={"qr"}>
                <img className={`qr-image`} src="/qr.png" alt=""/>
            <button onClick={backBtn}>
              Go Home
            </button>
              </div>
          }
        </div>

        <div className={`movies${currentScreen === "pay" ? " fullscreen" : ""}`} onScroll={scrollHandler}>
          <div className="flw"></div>
          {
            movieList.map(movie => {
              return (
                  < Movie key={movie.id} movie={movie} />
              )
            })
          }
          <div className="flw"></div>
        </div>
        <div className={`heroParent${currentScreen === "pay" ? " fullscreen" : ""}`}>
          <div className={`hero${currentScreen === "pay" ? " fullscreen" : ""}`}>
            <div className={`appBar${currentScreen === "pay" ? " fullscreen" : ""}`}>
              <i onClick={backBtn} className="fa-solid fa-arrow-left arrow-left"></i>
            </div>
            <div className={`cinemaHallParent${currentScreen === "pay" ? " fullscreen" : ""}`}>
              <div className="cinemaHall">
                <div className="seats">
                  {
                    [...Array(18)].map((_, index) => {
                      return (
                          <>
                            <input type="checkbox" id={"seat-" + index} onChange={handleCheck} />
                            <label htmlFor={"seat-" + index} className="seat">
                              <Seat>
                                {
                                  String(index + 1).padStart(2, "0")
                                }
                              </Seat>
                            </label>
                          </>
                      )
                    })
                  }
                </div>
                <div className="screen" />
              </div>
            </div>
            <h1 className={`${currentScreen === "pay" ? " fullscreen" : ""}`}>
              {movieList[selectedMovie]?.title}
            </h1>
            {
                currentScreen === "main" &&
                <div className="dateTimeSelector">
                  <div className="selector"></div>
                  <div onScroll={scrollDayHandler} className="days">
                    <div className="flh"></div>
                    {
                      days.map(day => {
                        return (
                            <div className="">{day}</div>
                        )
                      })
                    }
                    <div className="flh"></div>
                  </div>
                  <div className="time" onScroll={scrollTimeHandler}>
                    <div className="flh"></div>
                    {
                      time.map(time => {
                        return (
                            <div className="">{time}</div>
                        )
                      })
                    }
                    <div className="flh"></div>
                  </div>
                </div>
            }
            <div className={`paymentParent${currentScreen === "pay" ? " fullscreen" : ""}`}>
              <div className="date-tickets-parent">
                <span>DATE</span>
                <span className="writing-style">{days[selectedDay]}</span>
              </div>
              <div className="time-tickets-parent">
                <span>TIME</span>
                <span className="writing-style">{time[selectedTime]}</span>
              </div>
              <div className="cinema-hall-tickets-parent">
                <span>HALL</span>
                <span className="writing-style">No: {selectedDay + 1}</span>
              </div>
              <div className="number-of-tickets-parent">
                <span>TICKETS</span>
                <span className="writing-style">{checkedSeats}{checkedSeats > 1 ? " Tickets" : " Ticket"}</span>
              </div>
            </div>
            <span className={`fee${currentScreen === "pay" ? " fullscreen" : ""}`} > $ {checkedSeats * 10} </span>

            <button className={`${currentScreen === "pay" ? " fullscreen" : ""}`}
                    onClick={btnHandler}>
              {
                  currentScreen === "main" && "Book"

              }
              {
                  currentScreen === "pay" && "Pay"
              }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

