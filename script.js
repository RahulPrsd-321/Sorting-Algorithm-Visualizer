window.onload = function() {
  let array = [];

  function generateArray(size = 50) {
    array = [];
    for (let i = 0; i < size; i++) {
      array.push(Math.floor(Math.random() * 300) + 10);
    }
    drawBars();
  }

  function drawBars() {
    const container = document.getElementById("array-container");
    container.innerHTML = "";
    array.forEach(value => {
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = `${value}px`;
      container.appendChild(bar);
    });
  }

  async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          bars[j].style.height = `${array[j]}px`;
          bars[j + 1].style.height = `${array[j + 1]}px`;
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    }
  }

  async function selectionSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[minIndex].style.height = `${array[minIndex]}px`;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  async function insertionSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        bars[j + 1].style.height = `${array[j + 1]}px`;
        j--;
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      array[j + 1] = key;
      bars[j + 1].style.height = `${key}px`;
      await new Promise(resolve => setTimeout(resolve, 30));
    }
  }

  async function mergeSortCaller() {
    await mergeSort(0, array.length - 1);
    drawBars();
  }

  async function mergeSort(start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
  }

  async function merge(start, mid, end) {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    let bars = document.getElementsByClassName("bar");

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        array[k] = left[i++];
      } else {
        array[k] = right[j++];
      }
      bars[k].style.height = `${array[k]}px`;
      k++;
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    while (i < left.length) {
      array[k] = left[i++];
      bars[k].style.height = `${array[k]}px`;
      k++;
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    while (j < right.length) {
      array[k] = right[j++];
      bars[k].style.height = `${array[k]}px`;
      k++;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  async function quickSortCaller() {
    await quickSort(0, array.length - 1);
    drawBars();
  }

  async function quickSort(low, high) {
    if (low < high) {
      let pi = await partition(low, high);
      await quickSort(low, pi - 1);
      await quickSort(pi + 1, high);
    }
  }

  async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;
    let bars = document.getElementsByClassName("bar");

    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        bars[i].style.height = `${array[i]}px`;
        bars[j].style.height = `${array[j]}px`;
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1]}px`;
    bars[high].style.height = `${array[high]}px`;
    await new Promise(resolve => setTimeout(resolve, 50));
    return i + 1;
  }

  async function heapSort() {
    let n = array.length;
    let bars = document.getElementsByClassName("bar");

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [array[0], array[i]] = [array[i], array[0]];
      bars[0].style.height = `${array[0]}px`;
      bars[i].style.height = `${array[i]}px`;
      await new Promise(resolve => setTimeout(resolve, 50));
      await heapify(i, 0);
    }
  }

  async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let bars = document.getElementsByClassName("bar");

    if (left < n && array[left] > array[largest]) largest = left;
    if (right < n && array[right] > array[largest]) largest = right;

    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[largest].style.height = `${array[largest]}px`;
      await new Promise(resolve => setTimeout(resolve, 50));
      await heapify(n, largest);
    }
  }

  window.generateArray = generateArray;
  window.bubbleSort = bubbleSort;
  window.selectionSort = selectionSort;
  window.insertionSort = insertionSort;
  window.mergeSortCaller = mergeSortCaller;
  window.quickSortCaller = quickSortCaller;
  window.heapSort = heapSort;

  generateArray();
};