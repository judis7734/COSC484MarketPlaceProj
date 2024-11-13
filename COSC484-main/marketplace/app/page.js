import Button from "./components/Button";
import Header from "./components/Header"
import db from "./db"

export default function Home() {

  db.connect(function(err) {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database as id ' + db.threadId);
  });

const test=0;
  return (
    <div className="flex flex-col h-screen">
      <Header isLoggedIn={false}/>
      <div className="flex flex-col items-center justify-center gap-4 px-10 py-5 text-center text-2xl bg-blue-100 grow">
        Welcome to marketplace clone
        <Button text={"Browse"} href={"/browse"} />
      </div>
      <div className="px-10 py-5 bg-blue-200 mt-auto">
        <div className="flex gap-4"> 
          <div className="grow">
            Footer
          </div>
        </div>
      </div>
    </div>
  );
}
// just for fun
