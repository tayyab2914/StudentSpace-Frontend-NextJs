// pages/faculty/[id].js
import Head from 'next/head';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    // Replace the URL with your actual API endpoint.
    const res = await axios.get(`https://admin.studentspace.website/feedback/reviews/?faculty_id=${id}`);
    const data = res.data;
    return {
      props: {
        faculty: data.faculty, // contains name, designation, image_url, etc.
      },
    };
  } catch (error) {
    console.error('Error fetching faculty data:', error);
    return { notFound: true };
  }
}

export default function FacultyPage({ faculty }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = `https://studentspace.online/faculty/${faculty.id}`;
    }, 1); //  delay
    return () => clearTimeout(timer);
  }, [faculty]);

  return (
    <>
      <Head>
        <title>{faculty.name}</title>
        
        <meta name="description" content={`View reviews for Professor ${faculty.name} on StudentSpace, highlighting teaching quality and expertise.`} />

        <meta property="og:title" content={faculty.name} />
        <meta property="og:description"  content={`View reviews on StudentSpace`} />
        <meta property="og:image" content={faculty.image_url} />
        <meta property="og:url" content={`https://www.studentspace.online/faculty/${faculty.id}`} />

        <meta name="twitter:title" content={faculty.name} />
        <meta name="twitter:description"  content={`View reviews on StudentSpace`} />
        <meta name="twitter:image" content={faculty.image_url} />
      </Head>

      <main style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p>Loading...</p>
      </main>
    </>
  );
}
