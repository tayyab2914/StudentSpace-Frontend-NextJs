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
    console.log("Hello brother")
    // Delay the redirect to allow social media scrapers to get the meta tags.
    const timer = setTimeout(() => {
      // Replace with your original React website URL.
      window.location.href = `https://studentspace.online/faculty/${faculty.id}`;
    }, 3000); // 5-second delay
    return () => clearTimeout(timer);
  }, [faculty]);

  return (
    <>
      <Head>
        {/* Page Title */}
        <title>{faculty.name}</title>
        
        {/* Standard description meta */}
        <meta name="description" content={faculty.designation} />

        {/* Open Graph meta tags for Facebook and other social platforms */}
        <meta property="og:title" content={faculty.name} />
        <meta property="og:description" content={faculty.designation} />
        <meta property="og:image" content={faculty.image_url} />
        <meta property="og:url" content={`https://www.studentspace.online/faculty/${faculty.id}`} />

        {/* Twitter card meta tags */}
        <meta name="twitter:title" content={faculty.name} />
        <meta name="twitter:description" content={faculty.designation} />
        <meta name="twitter:image" content={faculty.image_url} />
        

        {/* Optional: meta refresh for automatic redirection (if you prefer HTML-based redirect) */}
        {/* <meta http-equiv="refresh" content="5; url=https://studentspace.online/faculty/{faculty.id}" /> */}
      </Head>

      <main style={{ textAlign: 'center', marginTop: '2rem' }}>
        {/* <h1>{faculty.name}</h1>
        <p>{faculty.designation}</p>
        <img src={faculty.image_url} alt={faculty.name} style={{ borderRadius: '50%' }} /> */}
        <p>Loading...</p>
      </main>
    </>
  );
}
