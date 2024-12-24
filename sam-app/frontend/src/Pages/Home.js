import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the Tefilah Database</h1>
      <p>
        Davening for others is a powerful way to connect with our community and
        show care for those in need. This platform allows you to submit names
        for prayer requests, view those we are praying for, and join others in
        heartfelt tefilah. Whether it’s for health, success, or personal
        challenges, your prayers make a difference.
      </p>
      <p>
        Each week, we rotate the focus of our tefilos. One week, we pray for
        those seeking to have children; the next week, for individuals hoping to
        get married. Other weeks focus on parnasah (livelihood) and health.
        Everyone who signs up will receive the list of names specific to the
        week’s topic, allowing us to focus our tefilos on those in need.
      </p>
      <h2>What would you like to do?</h2>
      <div style={{ margin: "20px 0" }}>
        <button
          onClick={() => navigate("/submitname")}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Submit A New Name
        </button>
        <button
          onClick={() => navigate("/mynames")}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          View My Names
        </button>
        <button
          onClick={() => navigate("/subscribe")}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Subscribe for Updates
        </button>
      </div>
    </div>
  );
}

export default Home;
