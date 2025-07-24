
import Header from '../components/Header'
import SignInForm from '../components/form/SignInForm'
import Footer from '../components/Footer'
import { Phone, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

type Realtor = {
  id: number;
  name: string;
  photo: string;
  phone: string;
  email: string;
  description: string;
};

const Contact = () => {

  //fetch data from json-server users
  const [realtors,setRealtors] = useState<Realtor[]>();
  useEffect(()=>{
    fetch(`https://property-access-json-server.onrender.com/realtors`)
    .then(res =>{
      return res.json();
    })
    .then((data)=>{
      setRealtors(data);
      console.log(`fetched realtor data from server`);
      console.log(data);
    })
  },[]);

  return (
    <div>
       <Header/>
        <section className="bg-gray-50 py-16 px-4 md:px-8">
            <div className="max-w-5xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">Connect with a Realtor</h2>
                <p className="mt-2 text-gray-600">Reach out for help with buying, selling, or renting a home in the GTA.</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
                {realtors && realtors.map((realtor) => (
                <div
                    key={realtor.id}
                    className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center"
                >
                    <img
                    src={realtor.photo}
                    alt={realtor.name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">{realtor.name}</h3>
                    <p className="text-gray-600 mt-2">{realtor.description}</p>

                    <div className="flex gap-4 mt-6">
                    <a
                        href={`tel:${realtor.phone}`}
                        className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                        <Phone className="w-5 h-5" />
                        Call
                    </a>
                    <a
                        href={`mailto:${realtor.email}`}
                        className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                        <Mail className="w-5 h-5" />
                        Email
                    </a>
                    </div>
                </div>
                ))}
            </div>
        </section>
       <Footer />
    </div>
  )
}

export default Contact