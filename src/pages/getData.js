import { listItems } from './Home.vue';

export async function getData() {
const res = await fetch("http://localhost/wydarzenia.php", {
method: 'GET',
mode: 'no-cors',
headers: headers,
});
const finalRes = await res.json();
listItems.value = finalRes;
}
