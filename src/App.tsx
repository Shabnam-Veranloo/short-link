import { useEffect, useState } from "react";
import "./App.css";

const rulesExample = (
  <>
    <h2>1. پذیرش شرایط</h2>
    <p>
      با استفاده از سرویس کوتاه کننده لینک، شما موافقت می‌کنید که این قوانین و
      مقررات را به طور کامل خوانده و پذیرفته‌اید. اگر با هر یک از شرایط موافق
      نیستید، نباید از سرویس استفاده کنید.
    </p>

    <h2>2. استفاده مجاز</h2>
    <p>
      شما موافقت می‌کنید که از این سرویس فقط برای مقاصد قانونی و مجاز استفاده
      کنید. شما نباید از این سرویس برای:
    </p>
    <ul>
      <li>ایجاد لینک به صفحات مخرب، ویروسی یا هرگونه نرم‌افزار بدافزار.</li>
      <li>ارسال یا انتشار هرزنامه (Spam) یا تبلیغات ناخواسته.</li>
      <li>ایجاد لینک به محتوای نامناسب، غیراخلاقی، تحقیرآمیز یا نفرت‌انگیز.</li>
      <li>نقض حقوق مالکیت فکری یا هرگونه حقوق دیگران.</li>
    </ul>

    <h2>3. حریم خصوصی</h2>
    <p>
      ما متعهد به حفاظت از حریم خصوصی شما هستیم. اطلاعات شما طبق{" "}
      <a href="link_to_privacy_policy">سیاست حفظ حریم خصوصی</a> ما جمع‌آوری و
      استفاده می‌شود. با استفاده از سرویس، شما موافقت خود را با جمع‌آوری و
      استفاده از اطلاعات‌تان اعلام می‌کنید.
    </p>

    <h2>4. مسئولیت کاربران</h2>
    <p>
      شما به عنوان کاربر، مسئول محتوا و لینک‌هایی هستید که ایجاد و به اشتراک
      می‌گذارید. ما هیچ مسئولیتی در قبال محتوای لینک‌های شما نداریم و حق داریم
      هر لینک یا کاربری را که قوانین را نقض کند، حذف یا مسدود کنیم.
    </p>

    <h2>5. تغییرات در قوانین</h2>
    <p>
      ما حق داریم در هر زمان و به هر دلیلی، این قوانین و مقررات را تغییر دهیم.
      تغییرات انجام شده در این صفحه منتشر خواهد شد و استفاده مستمر از سرویس پس
      از هر گونه تغییر به منزله پذیرش قوانین جدید است.
    </p>
  </>
);

const postApiExample = `
POST /api/2.2/auth/signin HTTP/1.1
HOST: my-server
Content-Type:application/json
Accept:application/json

{
  "credentials": {
    "name": "administrator",
    "password": "passw0rd",
    "site": {
      "contentUrl": ""
    }
  }
}
`;

function App() {
  const [link, setLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [copy, setCopy] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showApis, setShowApis] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShortLink("sjdfhkjhsdfskjdhfkjshdf");
    //todo=>fecth api here and then set in state in response
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shortLink);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  const changeBottomView = (statusMode: string) => {
    if (statusMode == "rules") {
      setShowRules(!showRules);
      setShowApis(false);
    } else {
      setShowApis(!showApis);
      setShowRules(false);
    }
  };

  useEffect(() => {
    if (!link) {
      setShortLink("");
    }
  }, [link]);

  return (
    <div className="flex flex-col justify-center items-center border-[.1rem] border-[#cacaca] rounded-[.8rem] min-w-[40vw] max-w-[40vw]  p-[3.2rem] gap-8 transition-height duration-500 ease-in-out">
      <h1>لینک خود را وارد کنید</h1>
      <form onSubmit={onSubmit} className="flex items-center gap-4 w-full">
        <input
          className="flex-1 outline-none px-3 rounded-[.8rem] h-[4rem] text-[#000]"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          disabled={!link}
          type="submit"
          className="bg-[#314ce3] text-white px-4 py-2 rounded-[.8rem] h-[4rem] disabled:bg-gray-400"
        >
          کوتاه کن
        </button>
      </form>
      {link && shortLink && (
        <>
          <h2 className="mt-[2rem]">لینک کوتاه شده</h2>
          <div className="flex items-center gap-4 w-full">
            <div className="flex flex-1  justify-center items-center border-[.1rem] border-[#cacaca] rounded-[.8rem] p-[.8rem] h-[4rem]">
              {shortLink}
            </div>
            <button
              onClick={copyLink}
              style={{
                background: !copy ? "#ffffff" : "#29c934",
              }}
              className="bg-blue text-white px-4 py-2 rounded-[.8rem] opacity-90 h-[4rem] relative w-[4rem]"
            >
              {!copy ? (
                <>
                  <div className="border-[.1rem] border-[#323131] rounded-[.8rem]  absolute w-8 h-8  top-3 right-3" />
                  <div className="border-[.1rem] border-[#323131] rounded-[.8rem] absolute top-5 right-5 w-8 h-8" />
                </>
              ) : (
                <div className="checkmarkBox">
                  <div className="checkmark" />
                </div>
              )}
            </button>
          </div>
        </>
      )}
      <div className="flex justify-between items-center border-t-[.1rem] border-[#cacaca] w-full pt-[1rem] mt-[4rem]">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => changeBottomView("rules")}
        >
          <h3>قوانین و مقررات</h3>
          {!showRules ? (
            <i className="arrow down mb-1" />
          ) : (
            <i className="arrow up" />
          )}
        </div>
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => changeBottomView("api")}
        >
          {!showApis ? (
            <i className="arrow down mb-1" />
          ) : (
            <i className="arrow up" />
          )}
          <h3>API</h3>
        </div>
      </div>
      {showApis && (
        <pre
          dir="ltr"
          className=" rounded-[.8rem] p-4 justify-start items-start flex flex-col text-left"
        >
          <code>{postApiExample}</code>
        </pre>
      )}

      {showRules && (
        <div className="rounded-[.8rem] p-4 justify-start items-start flex flex-col text-right gap-2">
          {rulesExample}
        </div>
      )}
    </div>
  );
}

export default App;
