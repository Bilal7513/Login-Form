
export default function Footer() {
  return (
    <footer>
      <div className="text-white bg-[url(/footer-bg.png)] bg-no-repeat bg-center bg-cover ">
        <div className="bg-[#13151f] pt-[80px] pb-[30px] opacity-85">
          <div className="w-[1080px] mx-auto">
            <ul className="w-full flex z-[999]">
              <li className="w-[25%] p-[20px]">
                <img className="w-[30%] mb-[40px]" src="/Logo.png" alt="Logo" />
                <p className="text-[16px] mb-[10px]">7th Harley Place, London W1G 8LZ United Kingdom</p>
                <p className="text-[16px] font-semibold">Call us: (+880) 111 222 3456</p>
              </li>
              <li className="w-[25%] p-[20px]">
                <ul>
                  <li className="text-[22px] font-medium mb-[30px]">Legal</li>
                  <li className="text-[18px] mb-[15px]">Terms of Use</li>
                  <li className="text-[18px] mb-[15px]">Privacy Policy</li>
                  <li className="text-[18px]">Security</li>
                </ul>
              </li>
              <li className="w-[25%] p-[20px]">
                <ul>
                  <li className="text-[22px] font-medium mb-[30px]">Account</li>
                  <li className="text-[18px] mb-[15px]">My Account</li>
                  <li className="text-[18px] mb-[15px]">Watchlist</li>
                  <li className="text-[18px] mb-[15px]">Collections</li>
                  <li className="text-[18px]">User Guide</li>
                </ul>
              </li>
              <li className="w-[25%] p-[20px]">
                <h3 className="text-[22px] font-medium mb-[30px]">Newsletter</h3>
                <p className="text-[16px] mb-[20px]">Subscribe to our newsletter system now to get latest news from us.</p>
                <input type="email" placeholder="Enter your email.." className="bg-[#24262d] text-white w-full py-[8px] px-[15px] outline-0"/>
                <button className="text-[#eb315a] bg-transparent p-0 cursor-pointer mt-[5px]">SUBSCRIBE NOW</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
