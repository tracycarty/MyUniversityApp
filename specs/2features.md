# Assignment 1 Mini Specs

Project: Anonymous Emotional Support Platform

---

## Feature 1: Anonymous Support Post

**Purpose:**
Provide a safe and private space where users can express their emotions, thoughts, or problems without revealing their identity.

**Expected User:**
Individuals who are feeling stressed, overwhelmed, or in need of emotional support and want to share anonymously.

**Main Functionality:**
Users can write and submit an anonymous message. The message will be displayed in a public support feed where others can read and respond.

**UI Design:**

* A textarea input labeled **"Share your feelings anonymously..."**
* A **Post** button to submit the message
* Posts displayed as **cards** in a feed
* Each card contains:

  * Message content
  * Timestamp
  * Reply button

**Acceptance Criteria:**

1. Users can create and submit an anonymous support post.
2. The system displays the post in the support feed.
3. The post must not display any personal identity or username.
4. Each post must include a timestamp showing when it was created.

---

## Feature 2: Supportive Replies

**Purpose:**
Allow users to provide encouragement, advice, or emotional support by replying to anonymous posts.

**Expected User:**
Community members who want to help or support others by responding to their posts.

**Main Functionality:**
Users can write and submit replies to existing posts. Replies are displayed under the corresponding post in a threaded format.

**UI Design:**

* Each post includes a **Reply** button
* Clicking the button reveals a reply input field
* A **Send Reply** button to submit the response
* Replies appear below the post in a list format

**Acceptance Criteria:**

1. Users can write and submit a reply to an existing post.
2. The system displays replies under the correct post.
3. Replies must remain anonymous and must not include user identity.
4. Replies are displayed in chronological order.
