"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Report from "@/components/component/Report";
import parse from 'html-react-parser';

function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<any>({});
  const [id, setId] = useState('');
  const [content, setContent] = useState<string>('');

  async function getData() {
    try {
      const id: string = params.slug[0].toString();
      setId(id);
      const response = await axios.get(`http://localhost:3000/api/user/getBlogs?id=${id}`);
      const body = response.data;
      console.log(body.data);
      setData(body.data);
      
      if (typeof body.data.content === 'object' && body.data.content !== null) {
        setContent(JSON.stringify(body.data.content)); 
      } else if (typeof body.data.content === 'string') {
        setContent(body.data.content);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="flex flex-1 items-center justify-center">
        <div>
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
              <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3"></div>
              <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
                {data?.title}
              </p>
            </div>
            <div className="w-full space-y-4">
              <Image
                height={1000}
                width={1000}
                className="h-[200px] w-full rounded-xl object-cover md:h-full"
                src={data.imageUrl}
                alt="image"
              />
            </div>
            <div>
              {parse(content)}
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <Report blogId={id} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
