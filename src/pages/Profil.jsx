import { Card, Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

export default function Profil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getDataUsers() {
    const url = "https://api.escuelajs.co/api/v1/users/1";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setUser(result);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDataUsers();
  }, []);
  return (
    <div className="">
      {loading == true ? (
        <div className="flex justify-center">
          <Spinner aria-label="Loading" />
          <p className="font-bold mt-2">Memuat Data......</p>
        </div>
      ) : (
        <div className="flex justify-center mt-3">
          <Card className="w-170 justify-center">
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center gap-4">
                <Avatar img={user.avatar} size="xl" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h1>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {user.email}
              </h1>
              <h1 className="text-xl font-bold bg-cyan-400 text-gray-900 dark:text-cyan-50 w-30 rounded-full flex justify-center items-center">
                {user.role}
              </h1>
              <div className="border-y border-b-black dark:border-b-amber-50 text-gray-900 dark:text-white w-150 mt-5">
                <h1 className="my-3 mx-2">Edit</h1>
              </div>
              <div className="border-b border-b-black dark:border-b-amber-50 text-gray-900 dark:text-white w-150 ">
                <h1 className="my-3 mx-2">Setting</h1>
              </div>
              <div className="border-b border-b-black dark:border-b-amber-50 text-gray-900 dark:text-white w-150 ">
                <h1 className="my-3 mx-2">Coin</h1>
              </div>
              <div className="border-b border-b-black dark:border-b-amber-50 text-gray-900 dark:text-white w-150 ">
                <h1 className="my-3 mx-2">New Password</h1>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
