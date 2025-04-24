function fetchNumber() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(42);
      }, 2000);
    });
  }
  
  async function getNumber() {
    const result = document.getElementById('result');
    try {
      const number = await fetchNumber();
      result.textContent = `Отримане число: ${number}`;
    } catch (error) {
      result.textContent = `Помилка: ${error.message}`;
    }
  }
  