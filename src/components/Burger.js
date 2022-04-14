import React from "react";
import styled from "styled-components";

const Burger = ({className, showDrawer, setShowDrawer}) => {
  return (
    <div className={className}>
      <span className="navigation-links">
        <button
          aria-label="Toggle Mobile Menu Button"
          className={showDrawer ? "mobile-menu open" : "mobile-menu"}
          onClick={() => {
            setShowDrawer(!showDrawer)
          }}
        >
          <div className="bar-one" />
          <div className="bar-two" />
          <div className="bar-three" />
        </button>
      </span>
    </div>
  );
};

export default styled(Burger)`
.navigation-links {
  .mobile-menu {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    padding: 0;
    right: 1.5rem;
    top: 20px;

    &:focus {
      outline: none;
    }

    .bar-one,
    .bar-two,
    .bar-three {
      width: 2rem;
      height: 3px;
      background: #fff;
      border-radius: 10px;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: 1px;
    }

    .bar-one {
      transform: rotate(0);
    }

    .bar-two {
      opacity: 1;
      transform: translateX(0);
    }

    .bar-three {
      transform: rotate(0);
    }
  }

  .open {
    .bar-one {
      transform: rotate(45deg);
    }

    .bar-two {
      opacity: 0;
      transform: translateX(20px);
    }

    .bar-three {
      transform: rotate(-45deg);
    }
  }
}
`;
