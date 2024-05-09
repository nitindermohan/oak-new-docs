(() => {
  // <stdin>
  (() => {
    "use strict";
    Object.keys(localStorage).forEach(function(key) {
      if (/^global-alert-/.test(key)) {
        document.documentElement.setAttribute("data-global-alert", "closed");
      }
    });
    window.addEventListener("DOMContentLoaded", () => {
      var announcement = document.getElementById("announcement");
      if (announcement !== null) {
        var id = announcement.dataset.id;
        Object.keys(localStorage).forEach(function(key) {
          if (/^global-alert-/.test(key)) {
            if (key !== id) {
              localStorage.removeItem(key);
              document.documentElement.removeAttribute("data-global-alert");
            }
          }
        });
        announcement.addEventListener("closed.bs.alert", () => {
          localStorage.setItem(id, "closed");
        });
      }
    });
  })();
})();
/*!
 * Dismissable alert for Bootstrap based Hyas sites
 * Copyright 2021-2023 Hyas
 * Licensed under the MIT License
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiPHN0ZGluPiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyohXHJcbiAqIERpc21pc3NhYmxlIGFsZXJ0IGZvciBCb290c3RyYXAgYmFzZWQgSHlhcyBzaXRlc1xyXG4gKiBDb3B5cmlnaHQgMjAyMS0yMDIzIEh5YXNcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5cclxuKCgpID0+IHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAvLyBDaGVjayBpZiBhbGVydCBoYXMgYmVlbiBjbG9zZWQsIGFuZCBzZXQgZGF0YS1nbG9iYWwtYWxlcnQgdG8gY2xvc2VkXHJcbiAgICBPYmplY3Qua2V5cyhsb2NhbFN0b3JhZ2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGlmICgvXmdsb2JhbC1hbGVydC0vLnRlc3Qoa2V5KSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWdsb2JhbC1hbGVydCcsICdjbG9zZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBFbmFibGUgYWxlcnQgY2xvc2luZywgb24gRE9NQ29udGVudExvYWRlZFxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgdmFyIGFubm91bmNlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbm5vdW5jZW1lbnQnKTtcclxuXHJcbiAgICAgICAgaWYgKGFubm91bmNlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgaWQgPSBhbm5vdW5jZW1lbnQuZGF0YXNldC5pZDtcclxuXHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoL15nbG9iYWwtYWxlcnQtLy50ZXN0KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWdsb2JhbC1hbGVydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhbm5vdW5jZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2VkLmJzLmFsZXJ0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oaWQsICdjbG9zZWQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pKCk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBTUEsR0FBQyxNQUFNO0FBQ0g7QUFHQSxXQUFPLEtBQUssWUFBWSxFQUFFLFFBQVEsU0FBVSxLQUFLO0FBQzdDLFVBQUksaUJBQWlCLEtBQUssR0FBRyxHQUFHO0FBQzVCLGlCQUFTLGdCQUFnQixhQUFhLHFCQUFxQixRQUFRO0FBQUEsTUFDdkU7QUFBQSxJQUNKLENBQUM7QUFHRCxXQUFPLGlCQUFpQixvQkFBb0IsTUFBTTtBQUM5QyxVQUFJLGVBQWUsU0FBUyxlQUFlLGNBQWM7QUFFekQsVUFBSSxpQkFBaUIsTUFBTTtBQUN2QixZQUFJLEtBQUssYUFBYSxRQUFRO0FBRTlCLGVBQU8sS0FBSyxZQUFZLEVBQUUsUUFBUSxTQUFVLEtBQUs7QUFDN0MsY0FBSSxpQkFBaUIsS0FBSyxHQUFHLEdBQUc7QUFDNUIsZ0JBQUksUUFBUSxJQUFJO0FBQ1osMkJBQWEsV0FBVyxHQUFHO0FBQzNCLHVCQUFTLGdCQUFnQixnQkFBZ0IsbUJBQW1CO0FBQUEsWUFDaEU7QUFBQSxVQUNKO0FBQUEsUUFDSixDQUFDO0FBRUQscUJBQWEsaUJBQWlCLG1CQUFtQixNQUFNO0FBQ25ELHVCQUFhLFFBQVEsSUFBSSxRQUFRO0FBQUEsUUFDckMsQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNKLENBQUM7QUFBQSxFQUNMLEdBQUc7IiwKICAibmFtZXMiOiBbXQp9Cg==
