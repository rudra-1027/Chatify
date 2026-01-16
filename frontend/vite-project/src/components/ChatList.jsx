import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import SearchBar from './SearchBar';
import Request from './Request';



function ChatList({ mainUser, user }) {
  const banners = [
  "https://res.cloudinary.com/dddrnrk49/image/upload/v1768292404/zelda_800_u09yse.gif",
  "https://res.cloudinary.com/dddrnrk49/image/upload/v1768292642/paimon-in-a-hot-pot-genshin-impact_800_bqigvu.gif",
  "https://res.cloudinary.com/dddrnrk49/image/upload/v1768292405/pixel-koi-pond_800_lmpy6t.gif",
];
const [banner, setBanner] = useState("");
useEffect(() => {
  const randomBanner = banners[Math.floor(Math.random() * banners.length)];
  setBanner(randomBanner);
}, []);

     function getTimeAgo(date) {
    if (!date) return "";

    const diff = Math.floor((Date.now() - new Date(date)) / 60000);

    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  }
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const [data,setdata]=useState([])
  const navigate = useNavigate();
  const [isToggle, toggleProfile] = useState(false);
 
  async function handle(u) {

    const res = await fetch("/auth/OpenChat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ friendId: u.userId }) });
    const { chatId, userId } = await res.json();
    
    const msg = await fetch("/auth/getMessage", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ chatId }) });
    const { message } = await msg.json();
    navigate("/chat", { state: { mainUser, user: u, chatId, message } });
  }
  const [search,setSearch]=useState("")
  const listRender=search.trim()==="" ? user.frdInfo: user.frdInfo.filter(u=>u.user.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">  
     <div className="sticky top-0 z-20 ">
  
  {/* Banner */}
  <div className="relative rounded-2xl overflow-hidden mb-3">
    <div className="  h-[220px]  bg-gradient-to-r from-[#3f275f] to-[#0e081b]">
      <img
        src={banner}
        alt="chat banner"
        className="w-full h-full object-cover object-center opacity-40"
      />
    </div>

    {/* Header */}
    <div className="absolute inset-0 flex items-end justify-between px-4 pb-3">
      <div className="text-lg font-semibold text-white">  <div >
    <SearchBar value={search} onChange={setSearch} />
  </div></div>

      <button
        onClick={async () => {
          const res = await fetch("/auth/getFrdList", {
            method: "post",
            headers: { "content-type": "application/json" },
          });
          const d = await res.json();
          setdata(d.frdInfo);
          toggleProfile(true);
        }}
        className="flex items-center gap-2 bg-[#1a1633]/90 hover:bg-[#241f44] px-3 py-1.5 rounded-xl backdrop-blur transition"
      >
        <img
          src="https://res.cloudinary.com/dddrnrk49/image/upload/v1768290302/GIF_xgqv9s.gif"
          alt="Requests"
          className="w-7 h-7"
        />
      </button>
    </div>
  </div>

  {/* Search */}

</div>



      <div className="flex-1 overflow-y-auto no-scrollbar pt-1">
        <ul className="divide-y divide-gray-700">
          {listRender.map((u, i) => {

            const chat = user.frdStatus.find(c =>
              c.participants.includes(u.userId)
            );
            return (

              <li className="py-3 sm:py-4 border-hidden">
                <div className="flex items-center space-x-4" onClick={() => { handle(u); }}>
                  <div className="shrink-0">

                    <div className="w-16 h-16 rounded-full overflow-hidden cursor-pointer">
                      <img src={u.profile} alt="UserFrd" className="w-full h-full object-cover" />
                    </div>

                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{u.user}</p>
                    <p className="truncate text-sm text-gray-400">{chat?.message?.length > 0 && (
                      chat.message.at(-1).senderId !== u.userId
                        ? (() => {
                          const lastMsg = chat.message.at(-1);

                          const isSeen = lastMsg.seenBy.some(
                            s => s.userId === u.userId
                          );

                          return isSeen
                            ? "seen "+getTimeAgo(chat.message.at(-1).seenBy.at(-1).seenAt) : "sent "+getTimeAgo(chat.message.at(-1).sentAt)
                        })()
                        : (() => {
                          const unread = chat.message.filter(
                            m =>
                              m.senderId === u.userId &&
                              !m.seenBy.some(s => s.userId === mainUser.userId)
                          ).length;

                          return unread > 0 ?(
            <span className="inline-flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="12"
                height="12"
                className="text-blue-500 fill-current"
              >
                <circle cx="12" cy="12" r="6" />
              </svg>
              <span>{unread} new message{unread > 1 ? "s" : ""}</span>
            </span>
          )  : chat.message.at(-1).text;
                        })()
                    )}</p>
                  </div>
                </div>
                <div>

                </div>
              </li>
            )
          })}

        </ul>
       
        {isToggle && (
          <Request open={isToggle}   frdList={data} onClose={() =>{ toggleProfile(false)}} />
        )}
      </div>
    </div>
  )
}

export default ChatList
