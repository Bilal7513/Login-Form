export function setCookie(name, value, maxAge = 3600) {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
}

export function getCookie(name) {
    const cookies = document.cookie.split("; ");
    const found = cookies.find(row => row.startsWith(`${name}=`));
    return found ? found.split("=")[1] : null;
}
  
export function removeCookie(name) {
    document.cookie = `${name}=; max-age=0; path=/`;
}

export function setUsername(name, value, maxAge = 3600) {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
}

export function getUsername(name) {
  const cookies = document.cookie.split("; ");
  const found = cookies.find(row => row.startsWith(`${name}=`));
  return found ? found.split("=")[1] : null;
}

export function removeUsername(name) {
  document.cookie = `${name}=; max-age=0; path=/`;
}