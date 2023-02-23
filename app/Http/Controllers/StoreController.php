<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\DB;


class StoreController extends Controller {

    const ORDER_BY = 'title';
    const ORDER_TYPE = 'asc';
    const ITEMS_PER_PAGE = 3;

    private function getOrder($orderArray, $order, $default) {
        $value = array_search($order, $orderArray);
        if(!$value) {
            return $default;
        }
        return $value;
    }

    private function getOrderBy($order) {
        return $this->getOrder($this->getOrderBys(), $order, self::ORDER_BY);
    }

    private function getOrderBys() {
        return [
            'id'            => 'c1',
            'title'        => 'c2',
            'description'        => 'c3',
            'price'        => 'c4',
            'genre'   => 'c5',
            'releasedate'   => 'c6',
        ];
    }

    private function getOrderType($order) {
        return $this->getOrder($this->getOrderTypes(), $order, self::ORDER_TYPE);
    }

    private function getOrderTypes() {
        return [
            'asc'  => 't1',
            'desc' => 't2',
        ];
    }
    
    private function getOrderUrls($oBy, $oType, $q, $genre) {
        $urls = [];
        $orderBys = $this->getOrderBys();
        $orderTypes = $this->getOrderTypes();
        foreach($orderBys as $indexBy => $by) {
            foreach($orderTypes as $indexType => $type) {
                if($oBy == $indexBy && $oType == $indexType) {
                    $urls[$indexBy][$indexType] = url()->full() . '#';
                } else {
                    $urls[$indexBy][$indexType] = route('index',[
                                                        'orderby' => $by,
                                                        'ordertype' => $type,
                                                        'q' => $q,
                                                        'genre' => $genre]);
                }
            }
        }
        return $urls;
    }

    
    function index(Request $request) {
        $sql = DB::table('item')->select('item.*');
        $items = $sql->paginate(self::ITEMS_PER_PAGE);
         return view('welcome', ['items' => $items]);
    }
    function fetchData(Request $request) {
        $q = $request->input('q', '');
        $genre = $request->input('genre', '');
        $orderby = $this->getOrderBy($request->input('orderby'));
        $ordertype = $this->getOrderType($request->input('ordertype'));
        
        $sql = DB::table('item')->select('item.*');
        if($genre != '' && $q!='') {
            $sql = $sql->where('genre', $genre)
                        ->where('title', 'like', '%' . $q . '%');
        
        } else if($genre != '') {
            $sql = $sql->where('genre', 'like', '%' . $genre . '%');
            
        }else if($q != '' ) {
            $sql = $sql->where('title', 'like', '%' . $q . '%');
        }
        
        $sql = $sql->orderBy($orderby, $ordertype);
        if($orderby != self::ORDER_BY) {
            $sql = $sql->orderBy(self::ORDER_BY, self::ORDER_TYPE);
        }
        
        $items = $sql->paginate(self::ITEMS_PER_PAGE)->withQueryString();
        
        return response()->json(['items' => $items,]);
    }
    
    function show(Item $item){
        return view('item', ['item' => $item]);
    }
  
}