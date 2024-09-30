import { useEffect, useState, useRef, FormEvent } from "react";
import { FiTrash } from "react-icons/fi";
import { api } from "../services/api"; 
import Flutuante from "../components/Flutuante";
import Head from "next/head";

interface UserProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function Home() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const response = await api.get("/users");
    setUsers(response.data);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!nameRef.current?.value || !emailRef.current?.value) return;

    const response = await api.post("/user", {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    });

    setUsers((allUsers) => [...allUsers, response.data]);

    nameRef.current.value = "";
    emailRef.current.value = "";
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/user", {
        params: {
          id: id,
        },
      });

      const allUsers = users.filter((user) => user.id !== id);
      setUsers(allUsers);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
<Head>
       <title>Usuários</title>
    </Head>
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
          <Flutuante/>
      
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Usuários</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input
            type="text"
            placeholder="Digite seu nome completo"
            className="w-full mb-5 p-2 rounded"
            ref={nameRef}
          />

          <label className="font-medium text-white">Email:</label>
          <input
            type="email"
            placeholder="Digite seu email"
            className="w-full mb-5 p-2 rounded"
            ref={emailRef}
          />

          <input
            type="submit"
            value="Cadastrar"
            className="cursor-pointer w-full p-2 bg-pink-500 hover:bg-pink-800 rounded font-medium"
          />
        </form>

        <section className="flex flex-col gap-4">
          {users.map((user) => (
            <article
              key={user.id}
              className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200"
            >
              <p>
                <span className="font-medium">Nome:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {user.status ? "Ativo" : "Inativo"}
              </p>

              <button
                className="bg-red-600 w-7 h-7 hover:bg-red-900 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                onClick={() => handleDelete(user.id)}
              >
                <FiTrash size={18} color="FFF"></FiTrash>
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
    </>
  );
}
