"use client";
import React from 'react';
import IssueDetails from '@/components/individualIssuePage/IssueDetails';
import { NextPage } from 'next';

interface Params {
  issueId: string;
}

interface PageProps {
  params: Params;
}

const Page: NextPage<PageProps> = ({ params }) => {
  return (
    <div>
      <IssueDetails issueId={params.issueId} />
    </div>
  );
}

export default Page;
