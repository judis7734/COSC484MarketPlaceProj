import Button from "../components/Button";

export default function Home({ isLoggedIn }) {
  return (
    <div className="flex flex-col">
      <div className="px-10 py-5 bg-blue-200">
        <div className="flex gap-4"> 
          <a className="grow" href="/">
            Marketplace Clone
          </a>
          {!isLoggedIn ? (
            <>
              <Button text={"Sign Up"} href={"/signup"} />
              <Button text={"Log In"} href={"/login"} />
            </>
          ) : (
            <Button text={"Log Out"} href={"/logout"} />
          )}
        </div>
      </div>
    </div>
  );
}
