(() => {
  const root = document.documentElement;
  const cursor = document.querySelector(".cursor");
  const clock = document.querySelector("[data-clock]");
  const canvas = document.querySelector(".fx-dust");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;

  if (fine && !reduce) {
    document.body.classList.add("has-cursor");

    const move = (event) => {
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
      if (cursor) {
        cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      }
    };

    window.addEventListener("pointermove", move, { passive: true });

    document.querySelectorAll("a, button").forEach((node) => {
      node.addEventListener("pointerenter", () => document.body.classList.add("is-pointer"));
      node.addEventListener("pointerleave", () => document.body.classList.remove("is-pointer"));
    });

    document.querySelectorAll(".entry-card.is-primary").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--px", String((event.clientX - rect.left) / rect.width));
        card.style.setProperty("--py", String((event.clientY - rect.top) / rect.height));
      });
    });
  }

  if (clock) {
    const format = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Shanghai",
    });

    const tick = () => {
      clock.textContent = format.format(new Date()).replace(",", " ·");
    };

    tick();
    window.setInterval(tick, 30000);
  }

  if (!canvas || reduce || !canvas.getContext) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const particles = [];
  const count = 42;
  let width = 0;
  let height = 0;
  let running = true;

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  const spawn = () => {
    particles.length = 0;
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        s: Math.random() * 0.25 + 0.05,
        a: Math.random() * 0.35 + 0.08,
      });
    }
  };

  const draw = () => {
    if (!running) {
      return;
    }

    ctx.clearRect(0, 0, width, height);
    particles.forEach((dot) => {
      dot.y -= dot.s;
      if (dot.y < -4) {
        dot.y = height + 4;
        dot.x = Math.random() * width;
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(196, 165, 116, ${dot.a})`;
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fill();
    });

    window.requestAnimationFrame(draw);
  };

  resize();
  spawn();
  draw();
  window.addEventListener("resize", () => {
    resize();
    spawn();
  });

  document.addEventListener("visibilitychange", () => {
    running = document.visibilityState === "visible";
    if (running) {
      draw();
    }
  });
})();
