
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Khôi phục tùy chọn giao diện từ localStorage hoặc mặc định theo hệ thống
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches);

  if (isDark) {
    document.body.classList.add('dark-mode');
    document.documentElement.classList.add('dark-mode');
    updateAriaState(true);
  } else {
    document.body.classList.remove('dark-mode');
    document.documentElement.classList.remove('dark-mode');
    updateAriaState(false);
  }

  // Xử lý sự kiện khi người dùng click vào nút toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeDark = document.body.classList.toggle('dark-mode');
      document.documentElement.classList.toggle('dark-mode', activeDark);

      // Lưu trạng thái mới vào localStorage
      localStorage.setItem('theme', activeDark ? 'dark' : 'light');
      updateAriaState(activeDark);
    });
  }

  // Cập nhật thuộc tính hỗ trợ tiếp cận (Accessibility)
  function updateAriaState(darkActive) {
    if (!themeToggleBtn) return;
    const labelText = darkActive
      ? 'Chuyển sang chế độ Sáng (Light Mode)'
      : 'Chuyển sang chế độ Tối (Dark Mode)';
    themeToggleBtn.setAttribute('aria-label', labelText);
    themeToggleBtn.setAttribute('title', labelText);
    themeToggleBtn.setAttribute('aria-pressed', darkActive ? 'true' : 'false');
  }

  // Lắng nghe thay đổi theme hệ thống khi người dùng chưa chọn thủ công
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const systemDark = e.matches;
      document.body.classList.toggle('dark-mode', systemDark);
      document.documentElement.classList.toggle('dark-mode', systemDark);
      updateAriaState(systemDark);
    }
  });
});
