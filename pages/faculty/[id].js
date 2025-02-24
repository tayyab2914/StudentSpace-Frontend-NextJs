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

    // Redirect on the server-side
    return {
      redirect: {
        destination: `https://studentspace.online/faculty/${id}`,
        permanent: false, // This is a temporary redirect (you can set it to true for permanent redirects)
      },
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
  // Since we perform a server-side redirect, this code will not run for the user.
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
      </Head>

      <main style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p>Loading...</p>
      </main>
    </>
  );
}
