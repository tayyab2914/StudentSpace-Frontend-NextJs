import Head from "next/head";
import { useEffect } from "react";

export async function getServerSideProps({ params }) {
    const facultyId = params.id;

    try {
        const res = await fetch(`https://your-django-api.com/faculty/${facultyId}`);
        const faculty = await res.json();

        if (!res.ok) {
            throw new Error("Faculty not found");
        }

        return {
            props: { faculty },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}

export default function FacultyPreview({ faculty }) {
    useEffect(() => {
        setTimeout(() => {
            window.location.href = `https://your-react-app.com/faculty/${faculty.id}`;
        }, 2000);
    }, []);

    return (
        <>
            <Head>
                <title>{faculty.name} - Faculty Review</title>
                <meta property="og:title" content={faculty.name} />
                <meta property="og:description" content="Check out reviews for this faculty member." />
                <meta property="og:image" content={faculty.image_url} />
                <meta property="og:url" content={`https://your-nextjs-app.com/faculty/${faculty.id}`} />
            </Head>
            <p>Redirecting to faculty review...</p>
        </>
    );
}
