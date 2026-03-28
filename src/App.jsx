import { useState, useEffect } from "react";

const courseData = [
  { week: "Week 0", id: "0.1", title: "Introduction, Settings up IDE", duration: "15:05", category: "Basics" },
  { week: "Week 0", id: "0.2", title: "HTML Basic (Tags, Attributes)", duration: "33:07", category: "Basics" },
  { week: "Week 0", id: "0.3", title: "CSS Basic", duration: "59:41", category: "Basics" },
  { week: "Week 0", id: "0.4", title: "How to solve assignments", duration: "9:38", category: "Basics" },
  { week: "Week 1", id: "1.1", title: "Orientation Class", duration: "1:32:02", category: "JavaScript" },
  { week: "Week 1", id: "1.2", title: "JS Foundations", duration: "2:22:11", category: "JavaScript" },
  { week: "Week 1", id: "1.2b", title: "How to solve assignments", duration: "9:38", category: "JavaScript" },
  { week: "Week 1", id: "1.3", title: "Offline class | Basic JS APIs", duration: "1:07:15", category: "JavaScript" },
  { week: "Week 1", id: "1.4", title: "Loops, Functions, Callback functions", duration: "35:28", category: "JavaScript" },
  { week: "Week 1", id: "1.5", title: "Async functions, Promises and async await", duration: "1:16:10", category: "JavaScript" },
  { week: "Week 2", id: "2.1", title: "Promises and async JS revision, doubt session", duration: "3:05:43", category: "JavaScript" },
  { week: "Week 2", id: "2.2", title: "Express and Backend (Zoom upload)", duration: "2:55:30", category: "Backend" },
  { week: "Week 2", id: "2.3", title: "Bash and terminal", duration: "34:34", category: "DevOps" },
  { week: "Week 2", id: "2.4", title: "Bash and Terminal (Advance)", duration: "56:05", category: "DevOps" },
  { week: "Week 2", id: "2.5", title: "Express basics", duration: "1:18:44", category: "Backend" },
  { week: "Week 2", id: "2.6", title: "map, filter, arrow fns", duration: "19:13", category: "JavaScript" },
  { week: "Week 2", id: "2.7", title: "Git basics to advance", duration: "1:26:44", category: "DevOps" },
  { week: "Week 3", id: "3.0.1", title: "What We're Covering In Week 3", duration: "0:57", category: "Backend" },
  { week: "Week 3", id: "3.0.2", title: "Js Foundation Revision", duration: "1:28", category: "JavaScript" },
  { week: "Week 3", id: "3.0.3", title: "Node.Js Runtime", duration: "2:50", category: "Backend" },
  { week: "Week 3", id: "3.0.4", title: "Express Basics", duration: "1:43", category: "Backend" },
  { week: "Week 3", id: "3.0.5", title: "Express Advance Intro", duration: "1:02", category: "Backend" },
  { week: "Week 3", id: "3.0.6", title: "Databases Intro", duration: "1:22", category: "Database" },
  { week: "Week 3", id: "3.0.7", title: "Mongo Installation", duration: "6:43", category: "Database" },
  { week: "Week 3", id: "3.0.8", title: "Postgres Installation", duration: "1:10", category: "Database" },
  { week: "Week 3", id: "3.1", title: "Middlewares, global catches and zod", duration: "2:33:56", category: "Backend" },
  { week: "Week 3", id: "3.2", title: "Databases and auth", duration: "2:38:01", category: "Backend" },
  { week: "Week 3", id: "3.3", title: "Middleware recap and assignments", duration: "47:06", category: "Backend" },
  { week: "Week 3", id: "3.4", title: "JWT recap and assignment", duration: "40:16", category: "Backend" },
  { week: "Week 3", id: "3.5", title: "DOM Introduction (Laisha)", duration: "1:26:42", category: "Frontend" },
  { week: "Week 4", id: "4.1", title: "DOM", duration: "2:27:15", category: "Frontend" },
  { week: "Week 4", id: "4.2", title: "Foundation for React", duration: "2:14:46", category: "React" },
  { week: "Week 4", id: "4.3", title: "Mongo offline", duration: "2:09:56", category: "Database" },
  { week: "Week 5", id: "5.1a", title: "Diving into React", duration: "2:45:25", category: "React" },
  { week: "Week 5", id: "5.1b", title: "React (Local recording)", duration: "2:40:44", category: "React" },
  { week: "Week 5", id: "5.2a", title: "Creating a To-Do App", duration: "1:58:51", category: "React" },
  { week: "Week 5", id: "5.2b", title: "Creating a To-Do App (Re-upload)", duration: "1:58:51", category: "React" },
  { week: "Week 6", id: "6.1", title: "Popular react hooks, React deep dive", duration: "2:29:27", category: "React" },
  { week: "Week 6", id: "6.2", title: "useEffect, useMemo, useCallback", duration: "2:33:03", category: "React" },
  { week: "Week 6", id: "6.3", title: "Recap of everything in react, Intro to useRef", duration: "1:10:34", category: "React" },
  { week: "Week 6", id: "6.4", title: "Assignment solutions", duration: "46:16", category: "React" },
  { week: "Week 7", id: "7.1", title: "Context, prop drilling", duration: "1:48:13", category: "React" },
  { week: "Week 7", id: "7.2", title: "Recoil", duration: "2:05:21", category: "React" },
  { week: "Week 7", id: "7.3", title: "Recoil Deep dive", duration: "1:33:36", category: "React" },
  { week: "Week 8", id: "8.0", title: "Tailwind from Cohort 1", duration: "1:53:11", category: "Frontend" },
  { week: "Week 8", id: "8.1", title: "Tailwind class - Cohort 2", duration: "2:14:36", category: "Frontend" },
  { week: "Week 8", id: "8.2", title: "Building PayTM Project", duration: "2:05:53", category: "Project" },
  { week: "Week 8", id: "8.3", title: "axios vs fetch", duration: "21:42", category: "Frontend" },
  { week: "Week 8", id: "8.4", title: "PayTM Frontend", duration: "1:04:22", category: "Project" },
  { week: "Week 9", id: "9.1", title: "Custom hooks", duration: "2:20:04", category: "React" },
  { week: "Week 9", id: "9.2", title: "Typescript Intro", duration: "2:18:36", category: "TypeScript" },
  { week: "Week 9", id: "9.3", title: "Generics, enums, imports, exports", duration: "42:14", category: "TypeScript" },
  { week: "Week 10", id: "10.0.1", title: "Cohort 1 Postgres", duration: "1:32:24", category: "Database" },
  { week: "Week 10", id: "10.0.2", title: "Cohort 1 Prisma Video", duration: "1:51:00", category: "Database" },
  { week: "Week 10", id: "10.1", title: "Postgres", duration: "2:28:30", category: "Database" },
  { week: "Week 10", id: "10.2", title: "Prisma", duration: "2:03:57", category: "Database" },
  { week: "Week 11", id: "11.1", title: "Serverless Fns", duration: "2:29:02", category: "DevOps" },
  { week: "Week 11", id: "11.2", title: "Deploying to AWS", duration: "2:20:47", category: "DevOps" },
  { week: "Week 11", id: "11.3", title: "Certificate Management", duration: "54:00", category: "DevOps" },
  { week: "Week 12", id: "12.1", title: "Deploying Frontends on AWS", duration: "1:04:26", category: "DevOps" },
  { week: "Week 12", id: "12.2", title: "Typescript Advance APIs", duration: "41:54", category: "TypeScript" },
  { week: "Week 12", id: "12.C1", title: "Cohort 1 - Deploying npm packages, Intro to Mono repos", duration: "2:03:33", category: "DevOps" },
  { week: "Week 12", id: "12.3", title: "Actionable Docker to start packages", duration: "32:27", category: "DevOps" },
  { week: "Week 12", id: "12.4", title: "SQL Joins and Relationships", duration: "1:26:04", category: "Database" },
  { week: "Week 12", id: "12.5", title: "Prisma Recap, Relationships in Prisma", duration: "58:23", category: "Database" },
  { week: "Week 12", id: "12.6", title: "Connection pooling in serverless envs", duration: "32:04", category: "Database" },
  { week: "Week 13", id: "13.1", title: "Project (Local recording)", duration: "2:25:17", category: "Project" },
  { week: "Week 13", id: "13.2", title: "AMA Session", duration: "1:25:57", category: "Project" },
  { week: "Week 13", id: "13.3", title: "Offline video - Backend of blogging app (improved audio)", duration: "1:58:38", category: "Project" },
  { week: "Week 13", id: "13.4", title: "Frontend of Blogging app", duration: "2:39:46", category: "Project" },
  { week: "Week 14", id: "14.1", title: "NextJS Intro", duration: "2:05:16", category: "NextJS" },
  { week: "Week 14", id: "14.2", title: "Next Backend", duration: "2:12:54", category: "NextJS" },
  { week: "Week 14", id: "14.3", title: "NextJS Backend (Offline video)", duration: "1:35:59", category: "NextJS" },
  { week: "Week 15", id: "15.1", title: "Docker part 1", duration: "2:19:41", category: "DevOps" },
  { week: "Week 15", id: "15.2", title: "Docker part 2 (Reuploaded)", duration: "2:11:21", category: "DevOps" },
  { week: "Week 15", id: "15.3", title: "docker-compose, exec command, docker push", duration: "59:55", category: "DevOps" },
  { week: "Week 15", id: "15.4", title: "Bind mounts", duration: "14:22", category: "DevOps" },
  { week: "Week 16", id: "16.1", title: "Monorepo part 1", duration: "1:59:32", category: "DevOps" },
  { week: "Week 16", id: "16.2", title: "Monorepo part 2", duration: "~2:00:00", category: "DevOps" },
  { week: "Week 16", id: "16.3", title: "Authentication using cookies", duration: "1:17:44", category: "Backend" },
  { week: "Week 16", id: "16.4", title: "NextAuth", duration: "1:20:06", category: "NextJS" },
  { week: "Week 17", id: "17.1", title: "PayTM part 1", duration: "1:59:19", category: "Project" },
  { week: "Week 17", id: "17.2", title: "PayTM Part 2", duration: "1:44:48", category: "Project" },
  { week: "Week 18", id: "18.1", title: "PayTM Part 3", duration: "1:29:46", category: "Project" },
  { week: "Week 18", id: "18.1.2", title: "PayTM Part 3 (continued)", duration: "38:52", category: "Project" },
  { week: "Week 18", id: "18.2", title: "CI/CD", duration: "1:53:43", category: "DevOps" },
  { week: "Week 19", id: "19.0.1", title: "Middlewares in Next.js", duration: "27:34", category: "NextJS" },
  { week: "Week 19", id: "19.0.2", title: "CSR vs SSR vs SSG", duration: "38:46", category: "NextJS" },
  { week: "Week 19", id: "19.1", title: "Websockets and Advance backend comm", duration: "2:15:44", category: "Backend" },
  { week: "Week 19", id: "19.2", title: "Redis, Pub subs and Queues", duration: "2:17:21", category: "Backend" },
  { week: "Week 19", id: "19.C3a", title: "Websockets | Cohort-3", duration: "2:04:18", category: "Backend" },
  { week: "Week 19", id: "19.C3b", title: "WebSockets Project - Chat app | Cohort-3", duration: "2:10:41", category: "Project" },
  { week: "Week 20", id: "20.0", title: "1-100 orientation, setting up cms/daily", duration: "1:37:17", category: "Misc" },
  { week: "Week 20", id: "20.1", title: "OpenAPI Spec (Offline)", duration: "1:12:14", category: "Backend" },
  { week: "Week 20", id: "20.3", title: "OpenAPI Spec Class (Cohort 1)", duration: "2:16:06", category: "Backend" },
  { week: "Week 21", id: "21.1", title: "Rate limitting, DDoS and Captchas", duration: "2:35:35", category: "Backend" },
  { week: "Week 21", id: "21.2", title: "Singleton pattern + Pub subs", duration: "2:15:03", category: "Backend" },
  { week: "Week 22", id: "22.1", title: "Capacity estimation, Horizontal and Vertical scaling", duration: "2:06:48", category: "DevOps" },
  { week: "Week 22", id: "22.2", title: "Auto Scaling Groups", duration: "2:18:21", category: "DevOps" },
  { week: "Week 22", id: "22.3", title: "Indexing in databases", duration: "46:09", category: "Database" },
  { week: "Week 22", id: "22.4", title: "Normalization in DBs", duration: "55:31", category: "Database" },
  { week: "Week 23", id: "23.1", title: "WebRTC", duration: "2:24:58", category: "Backend" },
  { week: "Week 23", id: "23.2", title: "Webrtc, setting up projects, 0-1 farewell", duration: "2:02:41", category: "Project" },
  { week: "Week 24", id: "24.1", title: "GRPC", duration: "2:22:05", category: "Backend" },
  { week: "Week 24", id: "24.2", title: "Testing in the MERN stack", duration: "2:08:36", category: "Testing" },
  { week: "Week 24", id: "24.3", title: "Testing from start (Offline video)", duration: "1:50:01", category: "Testing" },
  { week: "Week 25", id: "25.1", title: "Integration and end to end tests", duration: "1:49:39", category: "Testing" },
  { week: "Week 26", id: "26.1", title: "Monitoring, Logging and Newrelic", duration: "2:26:24", category: "DevOps" },
  { week: "Week 26", id: "26.2", title: "Prometheus and Grafana", duration: "1:56:11", category: "DevOps" },
  { week: "Week 26", id: "26.3", title: "Monitoring using Prometheus and Grafana - Part 1", duration: "1:10:54", category: "DevOps" },
  { week: "Week 26", id: "26.4", title: "Monitoring using Prometheus and Grafana - Part 2", duration: "1:44:37", category: "DevOps" },
  { week: "Week 27", id: "27.1", title: "Kubernetes Part 1", duration: "2:18:33", category: "DevOps" },
  { week: "Week 27", id: "27.2", title: "Kubernetes Part 2", duration: "2:19:33", category: "DevOps" },
  { week: "Week 28", id: "28.1", title: "Kubernetes Part 3", duration: "2:17:45", category: "DevOps" },
  { week: "Week 28", id: "28.2", title: "Kubernetes Part 4", duration: "1:55:27", category: "DevOps" },
  { week: "Week 29", id: "29.1", title: "Kubernetes Part 5 (Volumes, PV, PVCs)", duration: "2:15:54", category: "DevOps" },
  { week: "Week 29", id: "29.2", title: "Kubernetes Part 6 (HPA, Node Autoscaling)", duration: "2:12:07", category: "DevOps" },
  { week: "Week 30", id: "30.1", title: "Exchange Project - Part 1", duration: "2:31:00", category: "Project" },
  { week: "Week 30", id: "30.2", title: "Exchange Project Part 2", duration: "2:28:58", category: "Project" },
  { week: "Week 31", id: "31.1", title: "Exchange Part 3 (Backend)", duration: "2:09:14", category: "Project" },
  { week: "Week 31", id: "31.2", title: "Exchange Part 4 - Scalable Websocket app", duration: "2:02:08", category: "Project" },
  { week: "Week 32", id: "32.1", title: "Kafka", duration: "1:16:27", category: "Backend" },
  { week: "Week 32", id: "32.2", title: "Docker swarm, container orchestration", duration: "22:37", category: "DevOps" },
  { week: "Week 33", id: "33.1", title: "Zapier part 1", duration: "2:33:09", category: "Project" },
  { week: "Week 33", id: "33.2", title: "Zapier part 2", duration: "1:58:45", category: "Project" },
  { week: "Week 33", id: "33.3", title: "Zapier Part 3 (Primary Backend)", duration: "1:04:08", category: "Project" },
  { week: "Week 33", id: "33.4", title: "Zapier frontend (Auth and landing page)", duration: "49:53", category: "Project" },
  { week: "Week 33", id: "33.5", title: "Zapier frontend Continued (Zaps and zap page)", duration: "43:09", category: "Project" },
  { week: "Week 34", id: "34.1", title: "Zapier Setup, AMA (Live)", duration: "54:07", category: "Project" },
  { week: "Week 34", id: "34.2", title: "Zapier finishing Frontend and Backend", duration: "1:16:52", category: "Project" },
  { week: "Week 34", id: "34.3", title: "Live Open source contributions", duration: "2:04:03", category: "Misc" },
  { week: "Week 34", id: "34.4", title: "Zapier - Sending emails and Solana via workers", duration: "1:46:03", category: "Project" },
  { week: "Week 35", id: "35.1", title: "Adhoc coding - PayTM Merchant app", duration: "2:15:28", category: "Project" },
  { week: "Week 35", id: "35.2", title: "AMA on ZOOM", duration: "1:54:15", category: "Misc" },
  { week: "Week 35", id: "35.C3a", title: "Ui/Ux Primitives by Keshav - Part 1 (C3)", duration: "2:29:01", category: "Frontend" },
  { week: "Week 35", id: "35.C3b", title: "Ui/Ux Primitives by Keshav - Part 2 (C3)", duration: "2:17:27", category: "Frontend" },
];

const dsaQuestions = [
  { id: 1, topic: "Arrays", title: "Two Sum", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/" },
  { id: 2, topic: "Arrays", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { id: 3, topic: "Arrays", title: "Contains Duplicate", difficulty: "Easy", link: "https://leetcode.com/problems/contains-duplicate/" },
  { id: 4, topic: "Arrays", title: "Product of Array Except Self", difficulty: "Medium", link: "https://leetcode.com/problems/product-of-array-except-self/" },
  { id: 5, topic: "Arrays", title: "Maximum Subarray (Kadane's)", difficulty: "Medium", link: "https://leetcode.com/problems/maximum-subarray/" },
  { id: 6, topic: "Arrays", title: "Maximum Product Subarray", difficulty: "Medium", link: "https://leetcode.com/problems/maximum-product-subarray/" },
  { id: 7, topic: "Arrays", title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
  { id: 8, topic: "Arrays", title: "Search in Rotated Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
  { id: 9, topic: "Arrays", title: "3Sum", difficulty: "Medium", link: "https://leetcode.com/problems/3sum/" },
  { id: 10, topic: "Arrays", title: "Container With Most Water", difficulty: "Medium", link: "https://leetcode.com/problems/container-with-most-water/" },
  { id: 11, topic: "Arrays", title: "Merge Intervals", difficulty: "Medium", link: "https://leetcode.com/problems/merge-intervals/" },
  { id: 12, topic: "Arrays", title: "Insert Interval", difficulty: "Medium", link: "https://leetcode.com/problems/insert-interval/" },
  { id: 13, topic: "Arrays", title: "Sort Colors (Dutch National Flag)", difficulty: "Medium", link: "https://leetcode.com/problems/sort-colors/" },
  { id: 14, topic: "Arrays", title: "Next Permutation", difficulty: "Medium", link: "https://leetcode.com/problems/next-permutation/" },
  { id: 15, topic: "Arrays", title: "Rotate Array", difficulty: "Medium", link: "https://leetcode.com/problems/rotate-array/" },
  { id: 16, topic: "Arrays", title: "Trapping Rain Water", difficulty: "Hard", link: "https://leetcode.com/problems/trapping-rain-water/" },
  { id: 17, topic: "Arrays", title: "Sliding Window Maximum", difficulty: "Hard", link: "https://leetcode.com/problems/sliding-window-maximum/" },
  { id: 18, topic: "Arrays", title: "Median of Two Sorted Arrays", difficulty: "Hard", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
  { id: 19, topic: "Arrays", title: "Subarray Sum Equals K", difficulty: "Medium", link: "https://leetcode.com/problems/subarray-sum-equals-k/" },
  { id: 20, topic: "Arrays", title: "Longest Consecutive Sequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-consecutive-sequence/" },
  { id: 21, topic: "Strings", title: "Valid Anagram", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram/" },
  { id: 22, topic: "Strings", title: "Valid Palindrome", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome/" },
  { id: 23, topic: "Strings", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { id: 24, topic: "Strings", title: "Longest Repeating Character Replacement", difficulty: "Medium", link: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
  { id: 25, topic: "Strings", title: "Minimum Window Substring", difficulty: "Hard", link: "https://leetcode.com/problems/minimum-window-substring/" },
  { id: 26, topic: "Strings", title: "Group Anagrams", difficulty: "Medium", link: "https://leetcode.com/problems/group-anagrams/" },
  { id: 27, topic: "Strings", title: "Encode and Decode Strings", difficulty: "Medium", link: "https://leetcode.com/problems/encode-and-decode-strings/" },
  { id: 28, topic: "Strings", title: "Palindromic Substrings", difficulty: "Medium", link: "https://leetcode.com/problems/palindromic-substrings/" },
  { id: 29, topic: "Strings", title: "Longest Palindromic Substring", difficulty: "Medium", link: "https://leetcode.com/problems/longest-palindromic-substring/" },
  { id: 30, topic: "Strings", title: "String to Integer (atoi)", difficulty: "Medium", link: "https://leetcode.com/problems/string-to-integer-atoi/" },
  { id: 31, topic: "Strings", title: "Reverse Words in a String", difficulty: "Medium", link: "https://leetcode.com/problems/reverse-words-in-a-string/" },
  { id: 32, topic: "Strings", title: "Find All Anagrams in a String", difficulty: "Medium", link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/" },
  { id: 33, topic: "Strings", title: "Implement strStr()", difficulty: "Easy", link: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/" },
  { id: 34, topic: "Strings", title: "Count and Say", difficulty: "Medium", link: "https://leetcode.com/problems/count-and-say/" },
  { id: 35, topic: "Strings", title: "Wildcard Matching", difficulty: "Hard", link: "https://leetcode.com/problems/wildcard-matching/" },
  { id: 36, topic: "Linked List", title: "Reverse Linked List", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-linked-list/" },
  { id: 37, topic: "Linked List", title: "Linked List Cycle", difficulty: "Easy", link: "https://leetcode.com/problems/linked-list-cycle/" },
  { id: 38, topic: "Linked List", title: "Merge Two Sorted Lists", difficulty: "Easy", link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
  { id: 39, topic: "Linked List", title: "Remove Nth Node From End of List", difficulty: "Medium", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
  { id: 40, topic: "Linked List", title: "Reorder List", difficulty: "Medium", link: "https://leetcode.com/problems/reorder-list/" },
  { id: 41, topic: "Linked List", title: "Merge k Sorted Lists", difficulty: "Hard", link: "https://leetcode.com/problems/merge-k-sorted-lists/" },
  { id: 42, topic: "Linked List", title: "LRU Cache", difficulty: "Medium", link: "https://leetcode.com/problems/lru-cache/" },
  { id: 43, topic: "Linked List", title: "Find the Duplicate Number", difficulty: "Medium", link: "https://leetcode.com/problems/find-the-duplicate-number/" },
  { id: 44, topic: "Linked List", title: "Add Two Numbers", difficulty: "Medium", link: "https://leetcode.com/problems/add-two-numbers/" },
  { id: 45, topic: "Linked List", title: "Copy List with Random Pointer", difficulty: "Medium", link: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
  { id: 46, topic: "Linked List", title: "Intersection of Two Linked Lists", difficulty: "Easy", link: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
  { id: 47, topic: "Linked List", title: "Palindrome Linked List", difficulty: "Easy", link: "https://leetcode.com/problems/palindrome-linked-list/" },
  { id: 48, topic: "Linked List", title: "Sort List", difficulty: "Medium", link: "https://leetcode.com/problems/sort-list/" },
  { id: 49, topic: "Linked List", title: "Reverse Nodes in k-Group", difficulty: "Hard", link: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
  { id: 50, topic: "Linked List", title: "Odd Even Linked List", difficulty: "Medium", link: "https://leetcode.com/problems/odd-even-linked-list/" },
  { id: 51, topic: "Trees", title: "Maximum Depth of Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
  { id: 52, topic: "Trees", title: "Same Tree", difficulty: "Easy", link: "https://leetcode.com/problems/same-tree/" },
  { id: 53, topic: "Trees", title: "Invert Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/invert-binary-tree/" },
  { id: 54, topic: "Trees", title: "Binary Tree Maximum Path Sum", difficulty: "Hard", link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
  { id: 55, topic: "Trees", title: "Binary Tree Level Order Traversal", difficulty: "Medium", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { id: 56, topic: "Trees", title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
  { id: 57, topic: "Trees", title: "Subtree of Another Tree", difficulty: "Easy", link: "https://leetcode.com/problems/subtree-of-another-tree/" },
  { id: 58, topic: "Trees", title: "Construct Binary Tree from Preorder and Inorder", difficulty: "Medium", link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
  { id: 59, topic: "Trees", title: "Validate Binary Search Tree", difficulty: "Medium", link: "https://leetcode.com/problems/validate-binary-search-tree/" },
  { id: 60, topic: "Trees", title: "Kth Smallest Element in a BST", difficulty: "Medium", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
  { id: 61, topic: "Trees", title: "Lowest Common Ancestor of a BST", difficulty: "Medium", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
  { id: 62, topic: "Trees", title: "Implement Trie (Prefix Tree)", difficulty: "Medium", link: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
  { id: 63, topic: "Trees", title: "Design Add and Search Words Data Structure", difficulty: "Medium", link: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
  { id: 64, topic: "Trees", title: "Word Search II", difficulty: "Hard", link: "https://leetcode.com/problems/word-search-ii/" },
  { id: 65, topic: "Trees", title: "Binary Tree Right Side View", difficulty: "Medium", link: "https://leetcode.com/problems/binary-tree-right-side-view/" },
  { id: 66, topic: "Trees", title: "Count Good Nodes in Binary Tree", difficulty: "Medium", link: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/" },
  { id: 67, topic: "Trees", title: "Path Sum II", difficulty: "Medium", link: "https://leetcode.com/problems/path-sum-ii/" },
  { id: 68, topic: "Trees", title: "Diameter of Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/diameter-of-binary-tree/" },
  { id: 69, topic: "Trees", title: "Balanced Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/balanced-binary-tree/" },
  { id: 70, topic: "Trees", title: "Flatten Binary Tree to Linked List", difficulty: "Medium", link: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/" },
  { id: 71, topic: "Graphs", title: "Number of Islands", difficulty: "Medium", link: "https://leetcode.com/problems/number-of-islands/" },
  { id: 72, topic: "Graphs", title: "Clone Graph", difficulty: "Medium", link: "https://leetcode.com/problems/clone-graph/" },
  { id: 73, topic: "Graphs", title: "Pacific Atlantic Water Flow", difficulty: "Medium", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
  { id: 74, topic: "Graphs", title: "Course Schedule", difficulty: "Medium", link: "https://leetcode.com/problems/course-schedule/" },
  { id: 75, topic: "Graphs", title: "Course Schedule II", difficulty: "Medium", link: "https://leetcode.com/problems/course-schedule-ii/" },
  { id: 76, topic: "Graphs", title: "Number of Connected Components", difficulty: "Medium", link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },
  { id: 77, topic: "Graphs", title: "Graph Valid Tree", difficulty: "Medium", link: "https://leetcode.com/problems/graph-valid-tree/" },
  { id: 78, topic: "Graphs", title: "Alien Dictionary", difficulty: "Hard", link: "https://leetcode.com/problems/alien-dictionary/" },
  { id: 79, topic: "Graphs", title: "Word Ladder", difficulty: "Hard", link: "https://leetcode.com/problems/word-ladder/" },
  { id: 80, topic: "Graphs", title: "Surrounded Regions", difficulty: "Medium", link: "https://leetcode.com/problems/surrounded-regions/" },
  { id: 81, topic: "Graphs", title: "Rotting Oranges", difficulty: "Medium", link: "https://leetcode.com/problems/rotting-oranges/" },
  { id: 82, topic: "Graphs", title: "Walls and Gates", difficulty: "Medium", link: "https://leetcode.com/problems/walls-and-gates/" },
  { id: 83, topic: "Graphs", title: "Max Area of Island", difficulty: "Medium", link: "https://leetcode.com/problems/max-area-of-island/" },
  { id: 84, topic: "Graphs", title: "Redundant Connection", difficulty: "Medium", link: "https://leetcode.com/problems/redundant-connection/" },
  { id: 85, topic: "Graphs", title: "Network Delay Time (Dijkstra)", difficulty: "Medium", link: "https://leetcode.com/problems/network-delay-time/" },
  { id: 86, topic: "Dynamic Programming", title: "Climbing Stairs", difficulty: "Easy", link: "https://leetcode.com/problems/climbing-stairs/" },
  { id: 87, topic: "Dynamic Programming", title: "House Robber", difficulty: "Medium", link: "https://leetcode.com/problems/house-robber/" },
  { id: 88, topic: "Dynamic Programming", title: "House Robber II", difficulty: "Medium", link: "https://leetcode.com/problems/house-robber-ii/" },
  { id: 89, topic: "Dynamic Programming", title: "Longest Palindromic Substring", difficulty: "Medium", link: "https://leetcode.com/problems/longest-palindromic-substring/" },
  { id: 90, topic: "Dynamic Programming", title: "Palindromic Substrings", difficulty: "Medium", link: "https://leetcode.com/problems/palindromic-substrings/" },
  { id: 91, topic: "Dynamic Programming", title: "Decode Ways", difficulty: "Medium", link: "https://leetcode.com/problems/decode-ways/" },
  { id: 92, topic: "Dynamic Programming", title: "Coin Change", difficulty: "Medium", link: "https://leetcode.com/problems/coin-change/" },
  { id: 93, topic: "Dynamic Programming", title: "Maximum Product Subarray", difficulty: "Medium", link: "https://leetcode.com/problems/maximum-product-subarray/" },
  { id: 94, topic: "Dynamic Programming", title: "Word Break", difficulty: "Medium", link: "https://leetcode.com/problems/word-break/" },
  { id: 95, topic: "Dynamic Programming", title: "Longest Increasing Subsequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-increasing-subsequence/" },
  { id: 96, topic: "Dynamic Programming", title: "Unique Paths", difficulty: "Medium", link: "https://leetcode.com/problems/unique-paths/" },
  { id: 97, topic: "Dynamic Programming", title: "Jump Game", difficulty: "Medium", link: "https://leetcode.com/problems/jump-game/" },
  { id: 98, topic: "Dynamic Programming", title: "Jump Game II", difficulty: "Medium", link: "https://leetcode.com/problems/jump-game-ii/" },
  { id: 99, topic: "Dynamic Programming", title: "Partition Equal Subset Sum", difficulty: "Medium", link: "https://leetcode.com/problems/partition-equal-subset-sum/" },
  { id: 100, topic: "Dynamic Programming", title: "Target Sum", difficulty: "Medium", link: "https://leetcode.com/problems/target-sum/" },
  { id: 101, topic: "Dynamic Programming", title: "0/1 Knapsack Problem", difficulty: "Medium", link: "https://leetcode.com/problems/ones-and-zeroes/" },
  { id: 102, topic: "Dynamic Programming", title: "Longest Common Subsequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-common-subsequence/" },
  { id: 103, topic: "Dynamic Programming", title: "Edit Distance", difficulty: "Hard", link: "https://leetcode.com/problems/edit-distance/" },
  { id: 104, topic: "Dynamic Programming", title: "Burst Balloons", difficulty: "Hard", link: "https://leetcode.com/problems/burst-balloons/" },
  { id: 105, topic: "Dynamic Programming", title: "Regular Expression Matching", difficulty: "Hard", link: "https://leetcode.com/problems/regular-expression-matching/" },
  { id: 106, topic: "Stack & Queue", title: "Valid Parentheses", difficulty: "Easy", link: "https://leetcode.com/problems/valid-parentheses/" },
  { id: 107, topic: "Stack & Queue", title: "Min Stack", difficulty: "Medium", link: "https://leetcode.com/problems/min-stack/" },
  { id: 108, topic: "Stack & Queue", title: "Evaluate Reverse Polish Notation", difficulty: "Medium", link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
  { id: 109, topic: "Stack & Queue", title: "Generate Parentheses", difficulty: "Medium", link: "https://leetcode.com/problems/generate-parentheses/" },
  { id: 110, topic: "Stack & Queue", title: "Daily Temperatures", difficulty: "Medium", link: "https://leetcode.com/problems/daily-temperatures/" },
  { id: 111, topic: "Stack & Queue", title: "Car Fleet", difficulty: "Medium", link: "https://leetcode.com/problems/car-fleet/" },
  { id: 112, topic: "Stack & Queue", title: "Largest Rectangle in Histogram", difficulty: "Hard", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
  { id: 113, topic: "Stack & Queue", title: "Basic Calculator II", difficulty: "Medium", link: "https://leetcode.com/problems/basic-calculator-ii/" },
  { id: 114, topic: "Stack & Queue", title: "Implement Queue using Stacks", difficulty: "Easy", link: "https://leetcode.com/problems/implement-queue-using-stacks/" },
  { id: 115, topic: "Stack & Queue", title: "Next Greater Element I", difficulty: "Easy", link: "https://leetcode.com/problems/next-greater-element-i/" },
  { id: 116, topic: "Heap", title: "Kth Largest Element in an Array", difficulty: "Medium", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
  { id: 117, topic: "Heap", title: "Top K Frequent Elements", difficulty: "Medium", link: "https://leetcode.com/problems/top-k-frequent-elements/" },
  { id: 118, topic: "Heap", title: "Find Median from Data Stream", difficulty: "Hard", link: "https://leetcode.com/problems/find-median-from-data-stream/" },
  { id: 119, topic: "Heap", title: "Task Scheduler", difficulty: "Medium", link: "https://leetcode.com/problems/task-scheduler/" },
  { id: 120, topic: "Heap", title: "K Closest Points to Origin", difficulty: "Medium", link: "https://leetcode.com/problems/k-closest-points-to-origin/" },
  { id: 121, topic: "Heap", title: "Last Stone Weight", difficulty: "Easy", link: "https://leetcode.com/problems/last-stone-weight/" },
  { id: 122, topic: "Heap", title: "Reorganize String", difficulty: "Medium", link: "https://leetcode.com/problems/reorganize-string/" },
  { id: 123, topic: "Heap", title: "Design Twitter", difficulty: "Medium", link: "https://leetcode.com/problems/design-twitter/" },
  { id: 124, topic: "Heap", title: "Find K Pairs with Smallest Sums", difficulty: "Medium", link: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/" },
  { id: 125, topic: "Heap", title: "IPO", difficulty: "Hard", link: "https://leetcode.com/problems/ipo/" },
  { id: 126, topic: "Binary Search", title: "Binary Search", difficulty: "Easy", link: "https://leetcode.com/problems/binary-search/" },
  { id: 127, topic: "Binary Search", title: "Search a 2D Matrix", difficulty: "Medium", link: "https://leetcode.com/problems/search-a-2d-matrix/" },
  { id: 128, topic: "Binary Search", title: "Koko Eating Bananas", difficulty: "Medium", link: "https://leetcode.com/problems/koko-eating-bananas/" },
  { id: 129, topic: "Binary Search", title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
  { id: 130, topic: "Binary Search", title: "Time Based Key-Value Store", difficulty: "Medium", link: "https://leetcode.com/problems/time-based-key-value-store/" },
  { id: 131, topic: "Binary Search", title: "Median of Two Sorted Arrays", difficulty: "Hard", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
  { id: 132, topic: "Binary Search", title: "Capacity To Ship Packages", difficulty: "Medium", link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/" },
  { id: 133, topic: "Binary Search", title: "Split Array Largest Sum", difficulty: "Hard", link: "https://leetcode.com/problems/split-array-largest-sum/" },
  { id: 134, topic: "Binary Search", title: "Find Peak Element", difficulty: "Medium", link: "https://leetcode.com/problems/find-peak-element/" },
  { id: 135, topic: "Binary Search", title: "Single Element in a Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/single-element-in-a-sorted-array/" },
  { id: 136, topic: "Backtracking", title: "Combination Sum", difficulty: "Medium", link: "https://leetcode.com/problems/combination-sum/" },
  { id: 137, topic: "Backtracking", title: "Combination Sum II", difficulty: "Medium", link: "https://leetcode.com/problems/combination-sum-ii/" },
  { id: 138, topic: "Backtracking", title: "Permutations", difficulty: "Medium", link: "https://leetcode.com/problems/permutations/" },
  { id: 139, topic: "Backtracking", title: "Subsets", difficulty: "Medium", link: "https://leetcode.com/problems/subsets/" },
  { id: 140, topic: "Backtracking", title: "Word Search", difficulty: "Medium", link: "https://leetcode.com/problems/word-search/" },
  { id: 141, topic: "Backtracking", title: "Palindrome Partitioning", difficulty: "Medium", link: "https://leetcode.com/problems/palindrome-partitioning/" },
  { id: 142, topic: "Backtracking", title: "Letter Combinations of a Phone Number", difficulty: "Medium", link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
  { id: 143, topic: "Backtracking", title: "N-Queens", difficulty: "Hard", link: "https://leetcode.com/problems/n-queens/" },
  { id: 144, topic: "Backtracking", title: "Sudoku Solver", difficulty: "Hard", link: "https://leetcode.com/problems/sudoku-solver/" },
  { id: 145, topic: "Backtracking", title: "Restore IP Addresses", difficulty: "Medium", link: "https://leetcode.com/problems/restore-ip-addresses/" },
  { id: 146, topic: "Two Pointers", title: "Valid Palindrome II", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome-ii/" },
  { id: 147, topic: "Two Pointers", title: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
  { id: 148, topic: "Two Pointers", title: "4Sum", difficulty: "Medium", link: "https://leetcode.com/problems/4sum/" },
  { id: 149, topic: "Two Pointers", title: "Minimum Size Subarray Sum", difficulty: "Medium", link: "https://leetcode.com/problems/minimum-size-subarray-sum/" },
  { id: 150, topic: "Two Pointers", title: "Longest Subarray with Ones after Replacement", difficulty: "Medium", link: "https://leetcode.com/problems/max-consecutive-ones-iii/" },
  { id: 151, topic: "Two Pointers", title: "Fruit Into Baskets", difficulty: "Medium", link: "https://leetcode.com/problems/fruit-into-baskets/" },
  { id: 152, topic: "Two Pointers", title: "Permutation in String", difficulty: "Medium", link: "https://leetcode.com/problems/permutation-in-string/" },
  { id: 153, topic: "Two Pointers", title: "Substring with Concatenation of All Words", difficulty: "Hard", link: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/" },
  { id: 154, topic: "Two Pointers", title: "Move Zeroes", difficulty: "Easy", link: "https://leetcode.com/problems/move-zeroes/" },
  { id: 155, topic: "Two Pointers", title: "Squares of a Sorted Array", difficulty: "Easy", link: "https://leetcode.com/problems/squares-of-a-sorted-array/" },
  { id: 156, topic: "Greedy", title: "Maximum Subarray", difficulty: "Medium", link: "https://leetcode.com/problems/maximum-subarray/" },
  { id: 157, topic: "Greedy", title: "Jump Game", difficulty: "Medium", link: "https://leetcode.com/problems/jump-game/" },
  { id: 158, topic: "Greedy", title: "Gas Station", difficulty: "Medium", link: "https://leetcode.com/problems/gas-station/" },
  { id: 159, topic: "Greedy", title: "Hand of Straights", difficulty: "Medium", link: "https://leetcode.com/problems/hand-of-straights/" },
  { id: 160, topic: "Greedy", title: "Merge Triplets to Form Target Triplet", difficulty: "Medium", link: "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/" },
  { id: 161, topic: "Greedy", title: "Partition Labels", difficulty: "Medium", link: "https://leetcode.com/problems/partition-labels/" },
  { id: 162, topic: "Greedy", title: "Valid Parenthesis String", difficulty: "Medium", link: "https://leetcode.com/problems/valid-parenthesis-string/" },
  { id: 163, topic: "Greedy", title: "Non-overlapping Intervals", difficulty: "Medium", link: "https://leetcode.com/problems/non-overlapping-intervals/" },
  { id: 164, topic: "Greedy", title: "Meeting Rooms II", difficulty: "Medium", link: "https://leetcode.com/problems/meeting-rooms-ii/" },
  { id: 165, topic: "Greedy", title: "Minimum Number of Arrows to Burst Balloons", difficulty: "Medium", link: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/" },
  { id: 166, topic: "Math & Bits", title: "Number of 1 Bits", difficulty: "Easy", link: "https://leetcode.com/problems/number-of-1-bits/" },
  { id: 167, topic: "Math & Bits", title: "Counting Bits", difficulty: "Easy", link: "https://leetcode.com/problems/counting-bits/" },
  { id: 168, topic: "Math & Bits", title: "Reverse Bits", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-bits/" },
  { id: 169, topic: "Math & Bits", title: "Missing Number", difficulty: "Easy", link: "https://leetcode.com/problems/missing-number/" },
  { id: 170, topic: "Math & Bits", title: "Sum of Two Integers", difficulty: "Medium", link: "https://leetcode.com/problems/sum-of-two-integers/" },
  { id: 171, topic: "Math & Bits", title: "Reverse Integer", difficulty: "Medium", link: "https://leetcode.com/problems/reverse-integer/" },
  { id: 172, topic: "Math & Bits", title: "Pow(x, n)", difficulty: "Medium", link: "https://leetcode.com/problems/powx-n/" },
  { id: 173, topic: "Math & Bits", title: "Multiply Strings", difficulty: "Medium", link: "https://leetcode.com/problems/multiply-strings/" },
  { id: 174, topic: "Math & Bits", title: "Single Number", difficulty: "Easy", link: "https://leetcode.com/problems/single-number/" },
  { id: 175, topic: "Math & Bits", title: "Single Number II", difficulty: "Medium", link: "https://leetcode.com/problems/single-number-ii/" },
  { id: 176, topic: "Math & Bits", title: "Bitwise AND of Numbers Range", difficulty: "Medium", link: "https://leetcode.com/problems/bitwise-and-of-numbers-range/" },
  { id: 177, topic: "Math & Bits", title: "Happy Number", difficulty: "Easy", link: "https://leetcode.com/problems/happy-number/" },
  { id: 178, topic: "Math & Bits", title: "Excel Sheet Column Number", difficulty: "Easy", link: "https://leetcode.com/problems/excel-sheet-column-number/" },
  { id: 179, topic: "Math & Bits", title: "Plus One", difficulty: "Easy", link: "https://leetcode.com/problems/plus-one/" },
  { id: 180, topic: "Math & Bits", title: "Largest Number", difficulty: "Medium", link: "https://leetcode.com/problems/largest-number/" },
];

const plan15Days = [
  { day: 1, label: "Foundations", courseTopics: ["Week 0 (All 4 videos)", "Week 1.1, 1.2 - Orientation + JS Foundations"], dsaTopics: "Arrays: Q1-Q7 (Two Sum -> Search in Rotated)", totalVideos: 6, studyHours: "6-7 hrs", tip: "Set up your dev environment. Focus on async JS concepts - they're everywhere in the course." },
  { day: 2, label: "JavaScript Deep Dive", courseTopics: ["Week 1.3-1.5 (JS APIs, Loops, Async)", "Week 2.1 (Promises revision)"], dsaTopics: "Arrays: Q8-Q14 (3Sum -> Sort Colors); Strings: Q21-Q23", totalVideos: 4, studyHours: "7-8 hrs", tip: "Master Promises and async/await - they underpin all backend code in the course." },
  { day: 3, label: "Backend Basics", courseTopics: ["Week 2.2-2.7 (Express, Bash, Git)", "Week 3.0.1-3.0.8 (Intro videos)"], dsaTopics: "Strings: Q24-Q30; Linked List: Q36-Q40", totalVideos: 10, studyHours: "7-8 hrs", tip: "Learn Git properly - branches, merge, rebase. You'll use it every day." },
  { day: 4, label: "Middlewares & Auth", courseTopics: ["Week 3.1-3.5 (Middlewares, Zod, DB, JWT, DOM)"], dsaTopics: "Linked List: Q41-Q50; Trees: Q51-Q55", totalVideos: 5, studyHours: "8-9 hrs", tip: "Understand JWT deeply - access tokens, refresh tokens, expiry." },
  { day: 5, label: "DOM & React Foundations", courseTopics: ["Week 4.1-4.3 (DOM, React Foundations, Mongo)", "Week 5.1 (Diving into React)"], dsaTopics: "Trees: Q56-Q65; Stack: Q106-Q110", totalVideos: 4, studyHours: "8-9 hrs", tip: "Understand why React exists before learning how it works." },
  { day: 6, label: "React Hooks & State", courseTopics: ["Week 5.2 (To-Do App)", "Week 6.1-6.4 (Hooks, useEffect, useMemo, useRef)"], dsaTopics: "Trees: Q66-Q70; Graphs: Q71-Q77", totalVideos: 5, studyHours: "7-8 hrs", tip: "Build the To-Do app yourself before watching Week 6 - test your understanding." },
  { day: 7, label: "State Management & Tailwind", courseTopics: ["Week 7.1-7.3 (Context, Recoil)", "Week 8.0-8.1 (Tailwind)"], dsaTopics: "Graphs: Q78-Q85; Binary Search: Q126-Q130", totalVideos: 5, studyHours: "7-8 hrs", tip: "Understand when to use local state vs global state (Recoil/Context)." },
  { day: 8, label: "Full Stack Projects", courseTopics: ["Week 8.2-8.4 (PayTM Project)", "Week 9.1-9.3 (Custom Hooks, TypeScript)"], dsaTopics: "Binary Search: Q131-Q135; Backtracking: Q136-Q140", totalVideos: 5, studyHours: "8-9 hrs", tip: "Start TypeScript now - it makes you a more hirable developer." },
  { day: 9, label: "Databases & ORM", courseTopics: ["Week 10.0.1-10.2 (Postgres, Prisma)", "Week 12.4-12.6 (SQL Joins, Relationships, Pooling)"], dsaTopics: "Backtracking: Q141-Q145; Two Pointers: Q146-Q152", totalVideos: 6, studyHours: "7-8 hrs", tip: "Learn SQL joins deeply - GROUP BY, subqueries, CTEs - interview staples." },
  { day: 10, label: "Deployment & DevOps", courseTopics: ["Week 11.1-11.3 (Serverless, AWS, SSL)", "Week 12.1-12.3 (AWS Frontend, Docker intro)"], dsaTopics: "Two Pointers: Q153-Q155; Greedy: Q156-Q163", totalVideos: 6, studyHours: "7-8 hrs", tip: "Actually deploy something to AWS - hands-on practice is key." },
  { day: 11, label: "NextJS & Blogging App", courseTopics: ["Week 13.1-13.4 (Blogging App Project)", "Week 14.1-14.3 (NextJS)"], dsaTopics: "Greedy: Q164-Q165; Heap: Q116-Q122", totalVideos: 7, studyHours: "8-9 hrs", tip: "Build the blogging app end-to-end. This is your portfolio project." },
  { day: 12, label: "Docker, Monorepo & Auth", courseTopics: ["Week 15.1-15.4 (Docker)", "Week 16.1-16.4 (Monorepo, Cookies, NextAuth)"], dsaTopics: "Heap: Q123-Q125; DP: Q86-Q95", totalVideos: 8, studyHours: "7-8 hrs", tip: "Docker is must-know for any backend role. Master docker-compose." },
  { day: 13, label: "Advanced Backend & PayTM", courseTopics: ["Week 17.1-18.2 (PayTM Full, CI/CD)", "Week 19.0.1-19.2 (Next.js SSR, WebSockets, Redis)"], dsaTopics: "DP: Q96-Q105; Math & Bits: Q166-Q172", totalVideos: 9, studyHours: "8-9 hrs", tip: "Understand CI/CD pipelines - GitHub Actions is the industry standard." },
  { day: 14, label: "System Design & Advanced Topics", courseTopics: ["Week 20-22 (OpenAPI, Rate Limiting, Scaling, DB Indexing)", "Week 23-24 (WebRTC, gRPC, Testing)"], dsaTopics: "Math & Bits: Q173-Q180; Review weakest topic", totalVideos: 10, studyHours: "8-9 hrs", tip: "Indexing and normalization concepts will come up in backend interviews." },
  { day: 15, label: "Kubernetes, Kafka & Projects", courseTopics: ["Week 25-29 (Testing, Monitoring, Kubernetes)", "Week 30-35 (Exchange, Zapier, Kafka, UI/UX)"], dsaTopics: "Mock interview: 10 random questions timed (45 min each)", totalVideos: "20+", studyHours: "9-10 hrs", tip: "Review all your DSA notes. Do a mock interview. You're ready - go apply!" },
];

const categoryColors = {
  "Basics": "#f59e0b", "JavaScript": "#3b82f6", "Backend": "#10b981", "Database": "#8b5cf6",
  "Frontend": "#ec4899", "React": "#06b6d4", "DevOps": "#f97316", "TypeScript": "#6366f1",
  "NextJS": "#64748b", "Project": "#14b8a6", "Testing": "#84cc16", "Misc": "#94a3b8",
};

const difficultyColors = {
  Easy: { bg: "#dcfce7", text: "#16a34a" },
  Medium: { bg: "#fef9c3", text: "#ca8a04" },
  Hard: { bg: "#fee2e2", text: "#dc2626" },
};

const STORAGE_KEY_VIDEOS = "100xdev-completed-videos";
const STORAGE_KEY_DSA = "100xdev-completed-dsa";

export default function App() {
  const [activeTab, setActiveTab] = useState("plan");
  const [completedVideos, setCompletedVideos] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_VIDEOS)) || {}; } catch { return {}; }
  });
  const [completedDSA, setCompletedDSA] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_DSA)) || {}; } catch { return {}; }
  });
  const [selectedDSATopic, setSelectedDSATopic] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedDay, setExpandedDay] = useState(null);

  useEffect(() => { localStorage.setItem(STORAGE_KEY_VIDEOS, JSON.stringify(completedVideos)); }, [completedVideos]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY_DSA, JSON.stringify(completedDSA)); }, [completedDSA]);

  const dsaTopics = ["All", ...new Set(dsaQuestions.map(q => q.topic))];
  const categories = ["All", ...Object.keys(categoryColors)];

  const filteredDSA = selectedDSATopic === "All" ? dsaQuestions : dsaQuestions.filter(q => q.topic === selectedDSATopic);
  const filteredVideos = selectedCategory === "All" ? courseData : courseData.filter(v => v.category === selectedCategory);

  const totalCompleted = Object.keys(completedVideos).filter(k => completedVideos[k]).length;
  const totalDSADone = Object.keys(completedDSA).filter(k => completedDSA[k]).length;
  const progress = Math.round((totalCompleted / courseData.length) * 100);
  const dsaProgress = Math.round((totalDSADone / dsaQuestions.length) * 100);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "#0f172a", color: "#e2e8f0" }}>
      <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 50%, #0f172a 100%)", padding: "24px 20px", borderBottom: "1px solid #334155" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>🚀</span>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#f8fafc" }}>100xDevs Complete Tracker</h1>
              <p style={{ margin: 0, fontSize: 13, color: "#94a3b8" }}>Live 0-100 · {courseData.length} videos · 180 DSA questions · 15-day plan</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>Course Progress</span>
                <span style={{ fontSize: 12, color: "#60a5fa", fontWeight: 700 }}>{totalCompleted}/{courseData.length} ({progress}%)</span>
              </div>
              <div style={{ height: 8, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #3b82f6, #06b6d4)", borderRadius: 4, transition: "width 0.3s" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>DSA Progress</span>
                <span style={{ fontSize: 12, color: "#10b981", fontWeight: 700 }}>{totalDSADone}/180 ({dsaProgress}%)</span>
              </div>
              <div style={{ height: 8, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${dsaProgress}%`, background: "linear-gradient(90deg, #10b981, #14b8a6)", borderRadius: 4, transition: "width 0.3s" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "#1e293b", borderBottom: "1px solid #334155", padding: "0 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 0 }}>
          {[
            { key: "plan", label: "📅 15-Day Plan" },
            { key: "course", label: "🎬 Course Videos" },
            { key: "dsa", label: "💻 DSA Questions" },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              padding: "14px 20px", border: "none", background: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 600, color: activeTab === tab.key ? "#60a5fa" : "#64748b",
              borderBottom: activeTab === tab.key ? "2px solid #3b82f6" : "2px solid transparent",
              transition: "all 0.2s"
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px" }}>
        {activeTab === "plan" && (
          <div>
            <div style={{ background: "#1e293b", borderRadius: 12, padding: 16, marginBottom: 20, border: "1px solid #334155" }}>
              <h3 style={{ margin: "0 0 8px", color: "#f8fafc", fontSize: 16 }}>⚡ 15-Day Blitz Strategy</h3>
              <p style={{ margin: 0, fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                Watch at 1.5-2x speed. Do DSA in the morning (fresh mind), course videos afternoon/evening.
                Skip re-upload duplicates. Build projects hands-on. Aim for <strong style={{ color: "#60a5fa" }}>8-10 hrs/day</strong>.
              </p>
            </div>
            {plan15Days.map((day, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: 12, marginBottom: 12, border: "1px solid #334155", overflow: "hidden" }}>
                <div onClick={() => setExpandedDay(expandedDay === i ? null : i)} style={{
                  padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16,
                  background: expandedDay === i ? "#1e3a5f" : "transparent"
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, flexShrink: 0, color: "#fff"
                  }}>D{day.day}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "#f8fafc", fontSize: 15 }}>Day {day.day}: {day.label}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{day.studyHours} · {day.totalVideos} videos</div>
                  </div>
                  <span style={{ color: "#64748b", fontSize: 18 }}>{expandedDay === i ? "▲" : "▼"}</span>
                </div>
                {expandedDay === i && (
                  <div style={{ padding: "0 20px 20px", borderTop: "1px solid #334155" }}>
                    <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
                      <div style={{ background: "#0f172a", borderRadius: 8, padding: 12, borderLeft: "3px solid #3b82f6" }}>
                        <div style={{ fontSize: 11, color: "#3b82f6", fontWeight: 700, marginBottom: 6 }}>🎬 COURSE CONTENT</div>
                        {day.courseTopics.map((t, j) => (
                          <div key={j} style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 2 }}>• {t}</div>
                        ))}
                      </div>
                      <div style={{ background: "#0f172a", borderRadius: 8, padding: 12, borderLeft: "3px solid #10b981" }}>
                        <div style={{ fontSize: 11, color: "#10b981", fontWeight: 700, marginBottom: 6 }}>💻 DSA PRACTICE</div>
                        <div style={{ fontSize: 13, color: "#cbd5e1" }}>{day.dsaTopics}</div>
                      </div>
                      <div style={{ background: "#0f172a", borderRadius: 8, padding: 12, borderLeft: "3px solid #f59e0b" }}>
                        <div style={{ fontSize: 11, color: "#f59e0b", fontWeight: 700, marginBottom: 4 }}>💡 PRO TIP</div>
                        <div style={{ fontSize: 13, color: "#cbd5e1" }}>{day.tip}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "course" && (
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
                  padding: "6px 14px", borderRadius: 20, border: "1px solid #334155", cursor: "pointer",
                  fontSize: 12, fontWeight: 600, background: selectedCategory === cat ? "#3b82f6" : "#1e293b",
                  color: selectedCategory === cat ? "#fff" : "#94a3b8"
                }}>{cat}</button>
              ))}
            </div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
              Showing {filteredVideos.length} of {courseData.length} videos · {totalCompleted} completed
            </div>
            {filteredVideos.map((video, i) => (
              <div key={i} onClick={() => setCompletedVideos(prev => ({ ...prev, [video.id]: !prev[video.id] }))} style={{
                background: completedVideos[video.id] ? "#0d2218" : "#1e293b",
                borderRadius: 10, padding: "12px 16px", marginBottom: 8,
                border: `1px solid ${completedVideos[video.id] ? "#10b981" : "#334155"}`,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
                opacity: completedVideos[video.id] ? 0.7 : 1, transition: "all 0.2s"
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                  background: completedVideos[video.id] ? "#10b981" : "#334155",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff"
                }}>{completedVideos[video.id] ? "✓" : ""}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: completedVideos[video.id] ? "#6ee7b7" : "#e2e8f0",
                    textDecoration: completedVideos[video.id] ? "line-through" : "none" }}>
                    {video.id} · {video.title}
                  </div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                    <span style={{ color: "#94a3b8" }}>{video.week}</span>
                    <span style={{ margin: "0 6px" }}>·</span>
                    <span>⏱ {video.duration}</span>
                  </div>
                </div>
                <span style={{
                  padding: "3px 8px", borderRadius: 10, fontSize: 10, fontWeight: 700, flexShrink: 0,
                  background: categoryColors[video.category] + "22",
                  color: categoryColors[video.category] || "#94a3b8"
                }}>{video.category}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "dsa" && (
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {dsaTopics.map(topic => (
                <button key={topic} onClick={() => setSelectedDSATopic(topic)} style={{
                  padding: "6px 14px", borderRadius: 20, border: "1px solid #334155", cursor: "pointer",
                  fontSize: 12, fontWeight: 600, background: selectedDSATopic === topic ? "#10b981" : "#1e293b",
                  color: selectedDSATopic === topic ? "#fff" : "#94a3b8"
                }}>{topic}</button>
              ))}
            </div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
              {filteredDSA.length} questions · {totalDSADone} solved
            </div>
            {filteredDSA.map((q, i) => (
              <div key={i} style={{
                background: completedDSA[q.id] ? "#0d2218" : "#1e293b",
                borderRadius: 10, padding: "12px 16px", marginBottom: 8,
                border: `1px solid ${completedDSA[q.id] ? "#10b981" : "#334155"}`,
                display: "flex", alignItems: "center", gap: 12
              }}>
                <div onClick={() => setCompletedDSA(prev => ({ ...prev, [q.id]: !prev[q.id] }))} style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0, cursor: "pointer",
                  background: completedDSA[q.id] ? "#10b981" : "#334155",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff"
                }}>{completedDSA[q.id] ? "✓" : ""}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: completedDSA[q.id] ? "#6ee7b7" : "#e2e8f0",
                    textDecoration: completedDSA[q.id] ? "line-through" : "none" }}>
                    {q.id}. {q.title}
                  </div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{q.topic}</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{
                    padding: "3px 8px", borderRadius: 10, fontSize: 11, fontWeight: 700,
                    background: difficultyColors[q.difficulty].bg, color: difficultyColors[q.difficulty].text
                  }}>{q.difficulty}</span>
                  <a href={q.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{
                    padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                    background: "#1e3a5f", color: "#60a5fa", textDecoration: "none", border: "1px solid #3b82f6"
                  }}>Solve →</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
