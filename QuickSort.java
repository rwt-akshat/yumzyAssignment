import java.util.*;

public class QuickSort {
    public static void main(String[] args) {
        int[] a = { 5, 7, 6, 55, 12, 55, 7, 99, 66, 33 };

        quickSort(a, 0, a.length - 1);
        System.out.print(Arrays.toString(a));

    }
    static void quickSort(int[] arr,int low, int high){
        if(low<high){
            int pivotPos=partition(arr,low,high);
            quickSort(arr,low,pivotPos-1);
            quickSort(arr, pivotPos+1, high);
        }
    }
    static int partition(int[] arr, int low,int high){
        int pivot=arr[high];
        int i=low-1;
        for(int j=low;j<high;j++){
            if(arr[j]<pivot){
                i++;
                int temp=arr[j];
                arr[j]=arr[i];
                arr[i]=temp;
            }
        }
        int temp=arr[i+1];
        arr[i+1]=pivot;
        arr[high]=temp;
        return i+1;
    }

}
